package com.smhrd.hogward.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.hogward.domain.T_Member;
import com.smhrd.hogward.service.MemService;

@RestController
//CORS : Cross-Origin 문제가 발생함.
@CrossOrigin("http://localhost:3000")
public class MemberController {
	
	@Autowired
	public MemService memService;
	
	
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
	
	//닉네임 중복확인
	@PostMapping("/nickcheck")
	public int nickCheck(@RequestParam("mem_nick") String mem_nick) {
		System.out.println(mem_nick);
		
		int cnt = memService.emailCheck(mem_nick);
		
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
	
	//로그인 체크 기능
	@PostMapping("/logincheck")
	public int loginCheck(@ModelAttribute T_Member member) {
		
		int cnt = memService.loginCheck(member);

		System.out.println(cnt);
		
		if(cnt>0) {
			System.out.println("로그인 성공");
			return 1;
		}else {
			System.out.println("로그인 실패!!");
			return 0;
		}
		
	}
	
	
	//회원정보 수정시 비밀번호 제외한 내용 보내주기
	
	
	
	//프로필 사진 수정요청 오면 db 저장하기
	
	
	
	//인증 랭킹 10위까지 프로필사진, 닉네임 보내기
	
	
}
