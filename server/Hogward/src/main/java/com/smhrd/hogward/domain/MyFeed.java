package com.smhrd.hogward.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class MyFeed {
	
	private String mem_photo;
	private String mem_nick;
	private String mem_joindate;
	private String mem_Introduce;
	private String b_file;
	private int b_seq;
	
}
