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
public class Ranking {
	
	private int rank;
	private String mem_email;
	private int authcount;
	private String mem_photo;
	private String mem_nick;
	
}
