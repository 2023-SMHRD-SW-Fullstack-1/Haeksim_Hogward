package com.smhrd.hogward.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.hogward.domain.T_Member;

import java.util.HashMap;



@Mapper
public interface MemMapper {
	
	public int join(T_Member member);

}
