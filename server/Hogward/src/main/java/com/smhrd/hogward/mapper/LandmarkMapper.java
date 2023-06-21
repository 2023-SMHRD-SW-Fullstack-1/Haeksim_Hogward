package com.smhrd.hogward.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.smhrd.hogward.domain.T_Landmark;

@Mapper
public interface LandmarkMapper {
	
	
	//랜드마크 리스트 사진 제외 모두 불러오기
	public List<T_Landmark> landmarkList();
	
	//클릭한 랜드마크 사진정보 불러오기
	public T_Landmark landmarkPhotoList(String lm_seq);
	
	//전지역 랜드마크 갯수 보내기
	public List<HashMap> landmarkCount();
	
	//회원별 인증한 랜드마크 정보 가져오기
	public List<HashMap> certifiedLand(String mem_email);

}
