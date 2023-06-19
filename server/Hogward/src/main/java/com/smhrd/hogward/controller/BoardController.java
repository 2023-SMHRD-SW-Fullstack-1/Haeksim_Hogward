package com.smhrd.hogward.controller;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

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

import com.smhrd.hogward.domain.T_Board;
import com.smhrd.hogward.service.BoardService;
import com.smhrd.hogward.service.UserFeedService;




@RestController
@CrossOrigin("http://localhost:3000")
public class BoardController {
	
	
	@Autowired
	private UserFeedService userFeedService;
	
	@Autowired
	private BoardService boardService;

	
	//유저들의 게시글이 모인 피드 불러오기   ---> 최신순으로 10개씩 보이게 수정하기.
	@GetMapping("/userfeed")
	public JSONArray userFeedList() {
		JSONArray array = userFeedService.userFeedList();
		return array;		
	}
	
	//게시글 모두 보기  ---- 필요없는듯...
	@GetMapping("/allboard")
	public JSONArray boardList() {
		System.out.println("tst");
		JSONArray array = boardService.boardList();
		System.out.println("all");
		return array;	
	}
	

	//한명의 사용자 피드 정보 불러오기 
	@GetMapping("/oneboard/{b_seq}")
	public JSONObject boardOne(@PathVariable("b_seq")String b_seq ) {
		return boardService.boardOne(b_seq);
	}
	
	
	//유저의 인증글 작성 정보 받아와서 db 저장하기
	//("insertboard /{mem_email}")
	@PostMapping("/insertboard")
	public void createboard(@RequestPart("b__file") MultipartFile file, @ModelAttribute T_Board board ) {
		
		System.out.println(board);
		
		String newFileName = UUID.randomUUID().toString() + file.getOriginalFilename();
		try {
			//이미지 file -> 저장(지정된 경로에)
			file.transferTo(new File(newFileName));
		} catch (IllegalStateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		board.setB_file(newFileName);
		
		int cnt = boardService.writeboard(board);
		
		if(cnt>0) {
			System.out.println("게시글 저장완료");

		}else {
			System.out.println("게시글 저장 실패!!");
		}
		
	}
	

}
