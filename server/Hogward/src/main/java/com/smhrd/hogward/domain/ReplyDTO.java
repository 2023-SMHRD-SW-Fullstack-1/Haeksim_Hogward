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
public class ReplyDTO {
	private String mem_email;
	private String mem_photo;
	private String b_comment;
	private String r_datetime;
	private int b_seq;
	private String mem_nick;
}
