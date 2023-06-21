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
public class T_Member {
private String mem_email;
private String mem_pw;
private String mem_landmark;
private int mem_joindate;
private char admin_yn;
private String mem_nick;
private String mem_photo;
private String mem_Introduce;

}



//public class T_Member {
//	private String mem_email;
//	private String mem_pw;
//	private String mem_landmark;
//	private int mem_joindate;
//	private char admin_yn;
//	private String mem_nick;
//	private String mem_photo;
//	
//}


//public class T_Member {
//	private String mem_email;
//	private String mem_pw;
//	private String mem_nick;
//	
//}
