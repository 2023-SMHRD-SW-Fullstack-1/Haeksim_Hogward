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
import com.smhrd.hogward.domain.UsersFeed;
import com.smhrd.hogward.mapper.BoardMapper;
import com.smhrd.shop.converter.ImageConverter;
import com.smhrd.shop.converter.ImageToBase64;



@Service
public class BoardService {
	
	@Autowired
	ResourceLoader resourceLoader;
	
	@Autowired
	public BoardMapper boardMapper;
	
	
	//유저 게시글 모두보기(유저피드)
	public JSONArray usersFeed() {
		List<UsersFeed> list = boardMapper.usersFeed();
		System.out.println(list);
		
		JSONArray jsonArray = new JSONArray();
		ImageConverter<File, String> converter = new ImageToBase64();
		
		
		for(UsersFeed userfeed : list) {
			
			File file1 = new File("c:\\uploadimage\\"+userfeed.getB_file());
			File file2 = new File("c:\\uploadimage\\"+userfeed.getMem_photo());
	
			String fileStringValue1 = null;
			String fileStringValue2 = null;
			
			try {
				fileStringValue1 = converter.convert(file1);
				fileStringValue2 = converter.convert(file2);
				
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			userfeed.setB_file(fileStringValue1);
			userfeed.setMem_photo(fileStringValue2);
			
			JSONObject obj = new JSONObject();
			obj.put("usersFeed", userfeed);
			
			jsonArray.add(obj); 
		}
		return jsonArray;
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
	
	
	//본인피드 게시물 클릭시 해당게시물 사진,정보 보내기
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
	

	//유저의 인증글(사진포함) DB 저장
	public int insertBoard(T_Board board) {
		return boardMapper.insertBoard(board);
	}
	
	//마법지도에서 랜드마크 클릭시 해당랜드마크 인증한 유저들의 사진들만 모두 보내주기
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
	
	
	
	
	
	
//	//게시글 모두 보기
//	public JSONArray boardList() {
//		System.out.println("aasscs");
//		List<T_Board> list = boardMapper.boardList();
//		
//		JSONArray jsonArray = new JSONArray();
//		ImageConverter<File, String> converter = new ImageToBase64();
//		
//	
//		for(T_Board board : list) {
//			
//			String filePath = "classpath:/static/boardImg/"+board.getB_file();
//			Resource resource = resourceLoader.getResource(filePath); //파일의 메타데이터
//			String fileStringValue = null;
//			try {
//				fileStringValue = converter.convert(resource.getFile());
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//			
//			board.setB_file(fileStringValue);
//			
//			JSONObject obj = new JSONObject();
//			obj.put("allboard", board);
//			
//			jsonArray.add(obj); 
//			
//		}
//		return jsonArray;
//	}
	
	
	

}
