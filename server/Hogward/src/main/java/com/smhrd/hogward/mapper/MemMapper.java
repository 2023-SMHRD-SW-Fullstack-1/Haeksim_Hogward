package com.smhrd.hogward.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.hogward.domain.T_Member;

import java.util.HashMap;



@Mapper
public interface MemMapper {
	
	// 멤버 사진주기
	public String userPhoto(String email);
	
	//이메일 중복체크
	public int emailCheck(String mem_email);
	
	//닉네임 중복체크
	public int nickCheck(String mem_nick);
	
	//회원가입시 정보 저장 
	public int join(T_Member member);
	
	//로그인 체크
	public String loginCheck(T_Member member);
	
	//프로필 사진 수정
	public int profileUpdate(String newFileName, String mem_email,String mem_nick, String mem_introduce);

}
