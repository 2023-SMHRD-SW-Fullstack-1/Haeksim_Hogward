package com.smhrd.hogward.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import com.smhrd.hogward.domain.LandAllUserPhoto;
import com.smhrd.hogward.domain.MyFeed;
import com.smhrd.hogward.domain.T_Board;
import com.smhrd.hogward.mapper.BoardMapper;
import com.smhrd.shop.converter.ImageConverter;
import com.smhrd.shop.converter.ImageToBase64;



@Service
public class BoardService {
	
	@Autowired
	ResourceLoader resourceLoader;
	
	@Autowired
	public BoardMapper boardMapper;
	
	
	//전체 게시판 불러오기
	public JSONArray boardList() {
		System.out.println("aasscs");
		List<T_Board> list = boardMapper.boardList();
		
		JSONArray jsonArray = new JSONArray();
		ImageConverter<File, String> converter = new ImageToBase64();
		
	
		for(T_Board board : list) {
			
			String filePath = "classpath:/static/boardImg/"+board.getB_file();
			Resource resource = resourceLoader.getResource(filePath); //파일의 메타데이터
			String fileStringValue = null;
			try {
				fileStringValue = converter.convert(resource.getFile());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			board.setB_file(fileStringValue);
			
			JSONObject obj = new JSONObject();
			obj.put("allboard", board);
			
			jsonArray.add(obj); 
			
		}
		return jsonArray;
	}
	
	
	//한사람의 게시글 불러오기
	public JSONObject boardOne(String b_seq) {
		T_Board board = boardMapper.boardOne(b_seq);
		
		ImageConverter<File, String> converter = new ImageToBase64();
		
		String filePath = "classpath:/static/boardImg/"+board.getB_file();
		Resource resource = resourceLoader.getResource(filePath); //파일의 메타데이터
		String fileStringValue = null;
		try {
			fileStringValue = converter.convert(resource.getFile());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		board.setB_file(fileStringValue);
		
		JSONObject obj = new JSONObject();
		obj.put("oneBoard", board);
		
		return obj;
		
	}
	
	//마이 피드
	public JSONArray myFeed(String mem_email) {
		List<MyFeed> feed = boardMapper.myFeed(mem_email);
		
		JSONArray jsonArray = new JSONArray();
		ImageConverter<File, String> converter = new ImageToBase64();
	
		for(MyFeed myfeed : feed) {
			
			File file = new File("c:\\uploadimage\\"+myfeed.getB_file());
	
			String fileStringValue = null;
			
			try {
				fileStringValue = converter.convert(file);
				
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			myfeed.setB_file(fileStringValue);
			
			JSONObject obj = new JSONObject();
			obj.put("myFeed", myfeed);
			
			jsonArray.add(obj); 
		}
		return jsonArray;	
	}
	
	
	//유저가 작성한 인증 정보 저장하기
	public int writeboard(T_Board board) {
		return boardMapper.writeboard(board);
	}
	
	
	
	//마법지도에서 랜드마크 클릭시 그곳을 인증한 유저들의 사진들만 모두 보내주기
	public JSONArray allUserPhoto(String lm_seq) {
	
		List<LandAllUserPhoto> list = boardMapper.allUserPhoto(lm_seq);
		
		JSONArray jsonArray = new JSONArray();
		ImageConverter<File, String > converter = new ImageToBase64();
		
	
		for(LandAllUserPhoto userphoto : list) {
			
			
			//File file = new File("c:\\uploadimage\\"+userphoto.getB_file()+".jpg");
			File file = new File("c:\\uploadimage\\"+userphoto.getB_file());
	
			String fileStringValue = null;
			
			try {
				fileStringValue = converter.convert(file);
				
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			userphoto.setB_file(fileStringValue);
			
			JSONObject obj = new JSONObject();
			obj.put("allUserPhoto", userphoto);
			
			jsonArray.add(obj); 
		

		
	}
	return jsonArray;
	
	
}
	
	
	
	
	

}
