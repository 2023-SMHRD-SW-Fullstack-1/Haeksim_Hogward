package com.smhrd.hogward.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.smhrd.hogward.domain.LandAllUserPhoto;
import com.smhrd.hogward.domain.T_Board;
import com.smhrd.hogward.service.BoardService;
import com.smhrd.shop.converter.ImageConverter;
import com.smhrd.shop.converter.ImageToBase64;

@RestController
@CrossOrigin("http://localhost:3000")
public class BoardController {
	
	@Autowired
	private BoardService boardService;

	//유저들의 게시글 불러오기(유저피드)   ---> 최신순으로 10개씩 보이게 수정하기.
	@GetMapping("/usersfeed")
	public JSONArray usersFeed() {
		JSONArray array = boardService.usersFeed();
		return array;		
	}

	
	//마이 피드보기
	@GetMapping("/myfeed/{mem_email}")
	public JSONArray myFeed(@PathVariable("mem_email")String mem_email) {
		JSONArray array = boardService.myFeed(mem_email);
		return array;
	}
	
	
	//본인피드 게시물 클릭시 해당게시물 사진,정보
	@GetMapping("/boardone/{b_seq}")
	public JSONObject boardOne(@PathVariable("b_seq")String b_seq ) {
		
		return boardService.boardOne(b_seq);
	}
	
	
	//유저의 인증글(사진포함) DB 저장
	@PostMapping("/insertboard")
	public void insertBoard(@RequestPart("b__file") MultipartFile file, @ModelAttribute T_Board board, HttpServletResponse response ) {
		
		String newFileName = UUID.randomUUID().toString() + file.getOriginalFilename();
		try {
			//이미지 file -> 저장(지정된 경로에)
			file.transferTo(new File(newFileName));
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		board.setB_file(newFileName);
		
		int cnt = boardService.insertBoard(board);
		
		if(cnt>0) {
			System.out.println("게시글 저장완료");
			String redirect_uri="http://localhost:3000/magicmap";
	    	try {
				response.sendRedirect(redirect_uri);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}else {
			System.out.println("게시글 저장 실패!!");
		}
		
	}
	
	
	//마법지도에서 랜드마크 클릭시 해당랜드마크 인증한 유저들의 사진들만 모두 보내주기
	@GetMapping("/board/alluserphoto/{lm_seq}")
	public JSONArray allUserLandPhoto(@PathVariable("lm_seq") String lm_seq){
			
			JSONArray array = boardService.allUserPhoto(lm_seq);
			return array;	
			
		}
	
	
	//랭킹 top 10
	@GetMapping("/ranking")
	public JSONArray rankingTen() {
		
		JSONArray array = boardService.rankingTen();
		return array;
		
	}
	
	
	
	
	
	
	
	
	//게시글 모두 보기  ---- 필요없는듯...
//	@GetMapping("/allboard")
//	public JSONArray boardList() {
//		System.out.println("tst");
//		JSONArray array = boardService.boardList();
//		System.out.println("all");
//		return array;	
//	}
	
	
	
	

}
