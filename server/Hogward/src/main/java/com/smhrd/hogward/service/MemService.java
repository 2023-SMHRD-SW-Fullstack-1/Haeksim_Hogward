package com.smhrd.hogward.service;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.hogward.domain.T_Member;
import com.smhrd.hogward.mapper.MemMapper;
import com.smhrd.shop.converter.ImageConverter;
import com.smhrd.shop.converter.ImageToBase64;

@Service
public class MemService {
	
	@Autowired
	private MemMapper memMapper;
	
    //멤버 사진주기
	public String userPhoto(String email){
		
		String photo = memMapper.userPhoto(email);
		File file1 = new File("c:\\uploadimage\\"+photo);
		String fileStringValue = null;
		ImageConverter<File, String> converter = new ImageToBase64();
		
		try {
			fileStringValue = converter.convert(file1);

		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return fileStringValue;
	}
	
	//이메일 중복체크
	public int emailCheck(String mem_email) {
		return memMapper.emailCheck(mem_email);
	}
	
	//닉네임 중복체크
	public int nickCheck(String mem_nick) {
		return memMapper.nickCheck(mem_nick);
	}
	
	//회원가입시 정보 저장 
	public int join(T_Member member) {
		return memMapper.join(member);
	}
	
	//로그인 체크
	public String loginCheck(T_Member member) {
		return memMapper.loginCheck(member);
	}
	
	//프로필 사진 수정
	public int profileUpdate(String newFileName, String mem_email, String mem_nick ,String mem_introduce) {
		return memMapper.profileUpdate(newFileName, mem_email,mem_nick, mem_introduce);
	}
	


}
