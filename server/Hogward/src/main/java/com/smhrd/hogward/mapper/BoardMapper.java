package com.smhrd.hogward.mapper;


import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.hogward.domain.LandAllUserPhoto;
import com.smhrd.hogward.domain.MyFeed;
import com.smhrd.hogward.domain.Ranking;
import com.smhrd.hogward.domain.T_Board;
import com.smhrd.hogward.domain.UsersFeed;

@Mapper
public interface BoardMapper {
	
	
	//유저피드
	public List<UsersFeed> usersFeed(int s_paging_num,int e_paging_num);
	
	//마이피드
	public List<MyFeed> myFeed(String mem_email);
	
	//본인피드 게시물 클릭시 해당게시물 사진,정보 보내기
	public T_Board boardOne(String b_seq);
	
	//유저의 인증글(사진포함) DB 저장
	public int insertBoard(T_Board board);
	
	//마법지도에서 랜드마크 클릭시 해당랜드마크 인증한 유저들의 사진들만 모두 보내주기
	public List<LandAllUserPhoto> allUserPhoto(String lm_seq);
	
	//랭킹 top 10
	public List<Ranking> rankingTen();
	

	
	//public List<T_Board> boardList();
}
