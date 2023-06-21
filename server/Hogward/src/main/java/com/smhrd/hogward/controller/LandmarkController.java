package com.smhrd.hogward.controller;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonArrayFormatVisitor;
import com.smhrd.hogward.service.LandmarkService;

@RestController
//CORS : Cross-Origin 문제가 발생함.
@CrossOrigin("http://localhost:3000")
public class LandmarkController {
	
	
	@Autowired
	private LandmarkService landService;
	
	//랜드마크 리스트 사진 제외 모두 불러오기
	@GetMapping("/alllandmark")
	public JSONArray landmarkList() {
		JSONArray array = landService.landmarkList();
		return array;
	}
	
	//클릭한 랜드마크 사진정보 불러오기
	@GetMapping("/alllandmark/photo/{lm_seq}")
	public JSONObject landmarkPhotoList(@PathVariable("lm_seq")String lm_seq) {
		 return landService.landmarkPhotoList(lm_seq);
	}
	
	//전지역 랜드마크 갯수 보내기
	@GetMapping("/landmark/count")
	public JSONArray landmarkCount() {
		JSONArray array = landService.landmarkCount();
		System.out.println(array);
		return array;
		
	}
	
	//회원별 인증한 랜드마크 정보 가져오기
	@GetMapping("/certifiedlandmarks/{mem_email}")
	public JSONArray certifiedLand(@PathVariable("mem_email")String mem_email) {
		JSONArray array = landService.certifiedLand(mem_email);
		System.out.println(array);
		return array;
	}
	
	
	
	
	
	
	
	
	
	
}
