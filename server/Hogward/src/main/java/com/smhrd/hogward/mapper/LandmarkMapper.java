package com.smhrd.hogward.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.hogward.domain.T_Landmark;

@Mapper
public interface LandmarkMapper {
	
	public List<T_Landmark> landmarkList();

}
