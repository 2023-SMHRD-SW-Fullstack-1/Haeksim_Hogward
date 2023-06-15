package com.smhrd.hogward.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class T_Member {
	private String mem_email;
	private String mem_pw;
	private int mem_birthdate;
	private char mem_gender;
	private String mem_addr;
	private String mem_landmark;
	private int mem_joindate;
	private char admin_yn;
	private String mem_nick;
	private String mem_photo;
}