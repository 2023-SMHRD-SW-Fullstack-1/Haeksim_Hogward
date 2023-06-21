package com.smhrd.hogward.mapper;


import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.hogward.domain.LandAllUserPhoto;
import com.smhrd.hogward.domain.MyFeed;
import com.smhrd.hogward.domain.T_Board;
import com.smhrd.hogward.domain.UsersFeed;

@Mapper
public interface BoardMapper {
	
	
	//유저피드
	public List<UsersFeed> usersFeed();
	
	public List<T_Board> boardList();
	
	public T_Board boardOne(String b_seq);
	
	//마이피드
	public List<MyFeed> myFeed(String mem_email);
	
	public int writeboard(T_Board board);
	
	public List<LandAllUserPhoto> allUserPhoto(String lm_seq);

}
