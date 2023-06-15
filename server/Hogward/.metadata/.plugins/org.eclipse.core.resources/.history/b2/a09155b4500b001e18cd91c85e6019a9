package com.smhrd.hogward.controller;

import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.hogward.service.BoardService;

@RestController
@CrossOrigin("http://localhost:3000")
public class BoardController {
	
	
	@Autowired
	private BoardService boardService;
	
	//유저들의 게시글이 모인 피드 불러오기
	@GetMapping("/allboard")
	public JSONArray boardList() {
		JSONArray array = boardService.boardList();
		return array;		
	}
	
	
	
	//한명의 사용자 피드 정보 불러오기

}
