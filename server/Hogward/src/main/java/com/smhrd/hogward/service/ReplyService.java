package com.smhrd.hogward.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.hogward.domain.ReplyDTO;
import com.smhrd.hogward.domain.T_Reply;
import com.smhrd.hogward.mapper.ReplyMapper;
import com.smhrd.shop.converter.ImageConverter;
import com.smhrd.shop.converter.ImageToBase64;

@Service
public class ReplyService {
	
	@Autowired
	private ReplyMapper replyMapper;
	
	
	
	// 리플 추가하기
	public int writeReply(T_Reply reply) {
		return replyMapper.writeReply(reply);
	}
	
	public JSONArray replylist(int b_seq){
		List<ReplyDTO> list = replyMapper.replylist(b_seq);
		
		JSONArray jsonArray = new JSONArray();
		ImageConverter<File, String> converter = new ImageToBase64();
		
		for(ReplyDTO replyDTO : list) {
			
			File file1 = new File("c:\\uploadimage\\"+replyDTO.getMem_photo());
			
			String fileStringValue1 = null;
			
			try {
				fileStringValue1 = converter.convert(file1);
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			replyDTO.setMem_photo(fileStringValue1);

			JSONObject obj = new JSONObject();
			replyDTO.setMem_photo(fileStringValue1);
			obj.put("replylist",replyDTO);
			
			jsonArray.add(obj);
		}
		
		
		return jsonArray; 
	}
	
}
