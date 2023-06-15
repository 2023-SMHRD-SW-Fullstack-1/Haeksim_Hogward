package com.smhrd.hogward.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.hogward.domain.UserFeed;



@Mapper
public interface UserFeedMapper {
	
	//board 리스트 전체 불러오기
	public List<UserFeed> userFeedList();
	
}
