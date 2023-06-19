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
public class T_Landmark {
	private int lm_seq;
	private String lm_name;
	private double lat;
	private double lng;
	private String lm_addr;
	private int them_seq;
	private String lm_district;
	private String lm_photo1;
	private String lm_photo2;
	private String lm_photo3;

}
