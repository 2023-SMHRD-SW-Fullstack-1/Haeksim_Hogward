package com.smhrd.hogward.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.hogward.domain.T_Board;

@Mapper
public interface BoardMapper {
	
	public List<T_Board> boardList();
	
	public T_Board boardOne(String b_seq);

}
