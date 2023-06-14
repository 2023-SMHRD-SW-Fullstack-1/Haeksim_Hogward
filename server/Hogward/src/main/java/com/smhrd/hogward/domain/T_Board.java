package com.smhrd.hogward.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class T_Board {
	private int b_seq;
	private String b_title;
	private String b_content;
	private String b_tag;
	private int b_datetime;
	private String b_loc;
	private double lat;
	private double lng;
	private String mem_email;
	private int b_views;
	private int b_likes;
	private String b_file;
	private String b_rep;
	private int lm_seq;
}
