package com.smhrd.hogward.controller;

import java.util.List;

import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.hogward.domain.ReplyDTO;
import com.smhrd.hogward.domain.T_Reply;
import com.smhrd.hogward.service.ReplyService;

@RestController
@CrossOrigin("http://localhost:3000")
public class ReplyController {
	
	@Autowired
	public ReplyService replyService;
	
	// 댓글 쓰기
	@PostMapping("/writereply")
	public int writereply(@RequestBody T_Reply reply) {

		int cnt = replyService.writeReply(reply);
		if(cnt ==0) {
			return 0;
		}else {
			return 1;
		}
	}
	
	// 댓글 조회하기
	@GetMapping("/replylist/{b_seq}")
	public JSONArray replylist(@PathVariable int b_seq){
		System.out.println("b_seq : " + b_seq);
//		List<ReplyDTO> list = replyService.replylist(b_seq);
		JSONArray array = replyService.replylist(b_seq);
		
		return array;
	}
	
	
}
