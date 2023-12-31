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
import com.smhrd.hogward.domain.Ranking;
import com.smhrd.hogward.domain.ReplyDTO;
import com.smhrd.hogward.domain.T_Board;
import com.smhrd.hogward.domain.UsersFeed;
import com.smhrd.hogward.mapper.BoardMapper;
import com.smhrd.hogward.mapper.ReplyMapper;
import com.smhrd.shop.converter.ImageConverter;
import com.smhrd.shop.converter.ImageToBase64;



@Service
public class BoardService {
	
	@Autowired
	ResourceLoader resourceLoader;
	
	@Autowired
	public BoardMapper boardMapper;
	
	@Autowired
	public ReplyMapper replyMapper;
	
	//유저 게시글 모두보기(유저피드)
	public JSONArray usersFeed(int s_paging_num, int e_paging_num) {
		List<UsersFeed> list = boardMapper.usersFeed(s_paging_num,e_paging_num);

		JSONArray jsonArray = new JSONArray();
		ImageConverter<File, String> converter = new ImageToBase64();
		
		for(UsersFeed userfeed : list) {
			System.out.println(userfeed.getB_seq());
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
//			리플 데이터 추가
			List<ReplyDTO> replyList = replyMapper.replylist(userfeed.getB_seq());
			for(ReplyDTO replydto : replyList) {
				File file3 = new File("c:\\uploadimage\\"+replydto.getMem_photo());
				String fileStringValue3 = null;
				
				try {
					fileStringValue3 = converter.convert(file3);	
				} catch (IOException e) {
					e.printStackTrace();
				}
				
				replydto.setMem_photo(fileStringValue3);			
				
			}
			userfeed.setB_file(fileStringValue1);
			userfeed.setMem_photo(fileStringValue2);
			userfeed.setReplyList(replyList);
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
			
			if(myfeed.getB_file() == null) {
				
				//File file2 = new File("c:\\uploadimage\\" + "defaultphoto.jpg");
				File file2 = new File("c:\\uploadimage\\" + myfeed.getMem_photo());

				String fileStringValue2 = null;
				
				try {
					
					fileStringValue2 = converter.convert(file2);
					
				} catch (IOException e) {
					e.printStackTrace();
				}
				
			
				myfeed.setMem_photo(fileStringValue2);
								
				JSONObject obj = new JSONObject();
				obj.put("myFeed", myfeed);
				
				jsonArray.add(obj); 
				
			}else {
				File file1 = new File("c:\\uploadimage\\"+myfeed.getB_file());
				File file2 = new File("c:\\uploadimage\\" +myfeed.getMem_photo());
				System.out.println(file2);

				String fileStringValue1 = null;
				String fileStringValue2 = null;
				
				try {
					fileStringValue1 = converter.convert(file1);
					fileStringValue2 = converter.convert(file2);
					
				} catch (IOException e) {
					e.printStackTrace();
				}
				
				myfeed.setB_file(fileStringValue1);
				myfeed.setMem_photo(fileStringValue2);
				
				
				JSONObject obj = new JSONObject();
				obj.put("myFeed", myfeed);
				
				jsonArray.add(obj); 
			}
			
		}
		return jsonArray;	
	}
	
	
	//본인피드 게시물 클릭시 해당게시물 사진,정보 보내기
	public JSONObject boardOne(String b_seq) {
		
		T_Board board = boardMapper.boardOne(b_seq);
		
		ImageConverter<File, String> converter = new ImageToBase64();
		
		File file = new File("c:\\uploadimage\\"+board.getB_file());
		
		String fileStringValue = null;
		try {
			fileStringValue = converter.convert(file);
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		System.out.println(file);
		board.setB_file(fileStringValue);
		
		JSONObject obj = new JSONObject();
		obj.put("boardOne", board);
		
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

			File file = new File("c:\\uploadimage\\"+userphoto.getB_file());
			String fileStringValue = null;
			
			try {
				fileStringValue = converter.convert(file);
				
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			userphoto.setB_file(fileStringValue);
			
			JSONObject obj = new JSONObject();
			obj.put("allUserPhoto", userphoto);
			
			jsonArray.add(obj);
	}
	return jsonArray;
}
	
	
	//랭킹 top 10
	public JSONArray rankingTen() {
		List<Ranking> list = boardMapper.rankingTen();
		
		JSONArray jsonArray = new JSONArray();
		ImageConverter<File, String > converter = new ImageToBase64();	
	
		for(Ranking rank : list) {

			File file = new File("c:\\uploadimage\\"+rank.getMem_photo());
			String fileStringValue = null;
			
			try {
				fileStringValue = converter.convert(file);
				
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			rank.setMem_photo(fileStringValue);
			
			JSONObject obj = new JSONObject();
			obj.put("rankingTen", rank);
			
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
