package com.smhrd.shop.converter;

import java.io.File;
import java.io.IOException;
import java.util.Base64;

import org.apache.commons.io.FileUtils;

public class ImageToBase64 extends ImageConverter<File, String> {

	@Override
	public String convert(File f) throws IOException {
		
		//파일을 문자열로 변환하는 코드
		//1. 파일 가지고 와서 byte 배열 형태로 읽어주기
		byte[] fileContent = FileUtils.readFileToByteArray(f);
		
		//2. 바이트 형태를 인코딩(base64)하여 String 형태로 바꾸기
		String result = Base64.getEncoder().encodeToString(fileContent);
		
		return result; 
	}

}
