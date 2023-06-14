package com.smhrd.hogward.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class T_Verification {
	private int veri_seq;
	private int lm_seq;
	private String mem_email;
	private int veri_datetime;
	private String veri_photo1;
	private String veri_photo2;
	private String veri_photo3;
	private String veri_photo4;
	private String veri_photo5;
	private String veri_memo;
	private int veri_startTime;
}
