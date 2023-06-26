package com.smhrd.hogward.controller;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smhrd.hogward.domain.T_Member;
import com.smhrd.hogward.service.MemService;

@RestController
//CORS : Cross-Origin 문제가 발생함.
@CrossOrigin("http://localhost:3000")
public class MemberController {
	
	@Autowired
	public MemService memService;
	
	@GetMapping("/userphoto/{mem_email}")
	public String userPhoto(@PathVariable("mem_email") String email) {
		return memService.userPhoto(email);
	}
	
	
	//이메일 중복체크
	@PostMapping("/emailcheck")
	public int emailCheck(@RequestParam("mem_email") String mem_email) {
		System.out.println(mem_email);
		
		int cnt = memService.emailCheck(mem_email);
		
		if(cnt==0) {
			System.out.println("사용가능한 아이디 입니다");
			return 0;
		}else {
			System.out.println("중복된 아이디 입니다");
			return 1;
		}
		
	}
	
	//닉네임 중복체크
	@PostMapping("/nickcheck")
	public int nickCheck(@RequestParam("mem_nick") String mem_nick) {
		System.out.println(mem_nick);
		
		int cnt = memService.nickCheck(mem_nick);
		System.out.println(cnt);
		if(cnt==0) {
			System.out.println("사용가능한 닉네임 입니다");
			return 0;
		}else {
			System.out.println("중복된 닉네임 입니다");
			return 1;
		}
		
	}
	
	//회원가입시 정보 저장 
	@PostMapping("/joinmember")
	public int join(@ModelAttribute T_Member member) {
		//	public int join(@RequestParam("mem_email") String mem_email) {
		//System.out.println(mem_email);
		
		System.out.println(member.getMem_email()+member.getMem_nick());
		
		int cnt = memService.join(member);
		System.out.println(cnt);
		
		if(cnt>0) {
			System.out.println("회원가입 성공");
			return 1;
		}else {
			System.out.println("회원가입 실패!!");
			return 0;
		}
		
	}
	
	//로그인 체크
	@PostMapping("/logincheck")
	public String loginCheck(@ModelAttribute T_Member member) {
		
		//int cnt = memService.loginCheck(member);
		String nick =  memService.loginCheck(member);
		
		System.out.println(nick);
		
		if(nick!=null) {
			System.out.println("로그인 성공");
			return nick;
		}else {
			System.out.println("로그인 실패!!");
			return null;
		}
		
	}

	//프로필 사진 수정
	@PostMapping("/profileupdate/{mem_email}")
	public int profileUpdate(@RequestPart("b_file") MultipartFile file, @PathVariable("mem_email")String mem_email, @RequestParam("mem_nick")String mem_nick,  @RequestParam("mem_introduce") String mem_introduce ,HttpServletResponse response) {
		System.out.println("123123");
		System.out.println(mem_introduce);
		System.out.println(mem_nick);
		String newFileName = UUID.randomUUID().toString() + file.getOriginalFilename();
		try {
			//이미지 file -> 저장(지정된 경로에)
			file.transferTo(new File(newFileName));
		} catch (IllegalStateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//member.setMem_photo(newFileName);
		
		int cnt = memService.profileUpdate(newFileName, mem_email,mem_nick, mem_introduce);
		
		if(cnt>0) {
			System.out.println("프로필 수정 완료");
			String redirect_uri="http://localhost:3000/mypage";
			
	    	try {
				response.sendRedirect(redirect_uri);
			} catch (IOException e) {
				e.printStackTrace();
			}
	    	return 1;

		}else {
			System.out.println("프로필 수정 실패!!");
			return 0;
		}
		
	}
	
	
	//회원정보 수정시 비밀번호 제외한 내용 보내주기
	
	
	
	
}
