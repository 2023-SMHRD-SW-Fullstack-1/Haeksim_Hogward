package com.smhrd.hogward.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class T_Landmark {
	private int lm_seq;
	private String lm_name;
	private double lat;
	private double lng;
	private String lm_addr;
	private String lm_photo1;
	private String lm_photo2;
	private String lm_photo3;
	private int them_seq;

}
