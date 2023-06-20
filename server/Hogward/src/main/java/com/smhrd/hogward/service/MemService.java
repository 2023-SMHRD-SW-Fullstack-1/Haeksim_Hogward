package com.smhrd.hogward.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.hogward.domain.T_Member;
import com.smhrd.hogward.mapper.MemMapper;

@Service
public class MemService {
	
	@Autowired
	private MemMapper memMapper;
	
	
	//회원가입시 정보 저장 
	public int join(T_Member member) {
		return memMapper.join(member);
	}
	
	
	//이메일 중복체크
	public int emailCheck(String mem_email) {
		return memMapper.emailCheck(mem_email);
	}
	
	//닉 중복체크
	public int nickCheck(String mem_nick) {
		return memMapper.emailCheck(mem_nick);
	}
	
	//로그인 체크
		public int loginCheck(T_Member member) {
			return memMapper.loginCheck(member);
		}
	

}
