package com.smhrd.hogward.service;

import java.io.File;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import com.smhrd.hogward.domain.T_Landmark;
import com.smhrd.hogward.mapper.LandmarkMapper;
import com.smhrd.shop.converter.ImageConverter;
import com.smhrd.shop.converter.ImageToBase64;

@Service
public class LandmarkService {
	
	@Autowired
	private LandmarkMapper landMapper;
	
	
	//특정경로에 있는 파일 가지고 오기
	@Autowired
	ResourceLoader resourceLoader;
	
	
	
	//랜드마크 리스트 사진 제외 모두 불러오기
	public JSONArray landmarkList() {
		List<T_Landmark> list = landMapper.landmarkList();
		
		JSONArray jsonArray = new JSONArray();
		ImageConverter<File, String> converter = new ImageToBase64();
		
		for(T_Landmark land : list) {
		
			JSONObject obj = new JSONObject(); //비어있는 jsonobject 생성
			obj.put("t_landmark", land); //비어있는 json object 에 값 추가
			
			jsonArray.add(obj); 
		}
		return jsonArray;

	}
			
	//클릭한 랜드마크 사진정보 불러오기
	public JSONObject landmarkPhotoList(String lm_seq) {
	T_Landmark landmark = landMapper.landmarkPhotoList(lm_seq);
	
	JSONArray jsonArray = new JSONArray();
	
	ImageConverter<File, String> converter = new ImageToBase64();
	
	//1. img필드값 수정 (파일이름에서 -> byte 문자열 형태로)
	//1-1. 변환할 파일 실제 경로 정의
	String filePath1 = "classpath:/static/lnadmarkImg/"+landmark.getLm_photo1();
	String filePath2 = "classpath:/static/lnadmarkImg/"+landmark.getLm_photo2();
	String filePath3 = "classpath:/static/lnadmarkImg/"+landmark.getLm_photo3();
	
	Resource resource1 = resourceLoader.getResource(filePath1); //파일의 메타데이터	
	Resource resource2 = resourceLoader.getResource(filePath2); //파일의 메타데이터	
	Resource resource3 = resourceLoader.getResource(filePath3); //파일의 메타데이터	
	
	String fileStringValue1 = null;
	String fileStringValue2 = null;
	String fileStringValue3 = null;

	try {
			fileStringValue1 = converter.convert(resource1.getFile());
			fileStringValue2 = converter.convert(resource2.getFile());
			fileStringValue3 = converter.convert(resource3.getFile());
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	//System.out.println(fileStringValue);
	landmark.setLm_photo1(fileStringValue1);
	landmark.setLm_photo2(fileStringValue2);
	landmark.setLm_photo3(fileStringValue3);			
	
	JSONObject obj = new JSONObject(); //비어있는 jsonobject 생성
	obj.put("t_landmark", landmark); //비어있는 json object 에 값 추가
	
	return obj;

}

	//전지역 랜드마크 갯수 보내기
	public JSONArray landmarkCount() {
	
	List<HashMap> list = landMapper.landmarkCount();
				
	System.out.println("hash : "+ list);
	System.out.println("--- : " + list.toString());
				
	JSONArray jsonArray = new JSONArray();
				
	ImageConverter<File, String> converter = new ImageToBase64();
	
	for(HashMap count : list) {	
		JSONObject obj = new JSONObject(); //비어있는 jsonobject 생성
		obj.put("LandmarkAllCount", count); //비어있는 json object 에 값 추가
		
		jsonArray.add(obj); 	
	}
	return jsonArray;
	
	
}
				
	//회원별 인증한 랜드마크 정보 가져오기
	public JSONArray certifiedLand(String mem_email) {
	List<HashMap> list = landMapper.certifiedLand(mem_email);
			
	System.out.println(list);
			
	JSONArray jsonArray = new JSONArray();
	ImageConverter<File, String> converter = new ImageToBase64();
			
	for(HashMap landmark : list) {
				
		JSONObject obj = new JSONObject(); //비어있는 jsonobject 생성
		obj.put("certifiedLandmark", landmark); //비어있는 json object 에 값 추가
					
		jsonArray.add(obj); 
						
		}
		return jsonArray;
				
				
	}
				
		
		
				
				
		
		
		
		
}
