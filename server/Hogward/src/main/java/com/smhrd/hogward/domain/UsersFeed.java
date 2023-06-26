package com.smhrd.hogward.domain;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.smhrd.hogward.mapper.LandmarkMapper;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UsersFeed {
	

	private String mem_photo;
	private String mem_nick;
	private String b_title;
	private String b_file;
	private String b_content;
	private String b_rep;
	private int b_likes;
	private int b_seq;
	private String b_datetime;
	private List<ReplyDTO> replyList;

}
