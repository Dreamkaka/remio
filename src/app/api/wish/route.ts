/*
 * @Author: kasuie
 * @Date: 2024-06-16 19:18:45
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-16 19:18:49
 * @Description:
 */
import { getConfig, setConfig } from "@/lib/config";
import { Decrypt } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export const GET = async (req: NextRequest) => {
  const config = await getConfig("count.json");
  return NextResponse.json({
    data: config,
    success: true,
    message: "success",
  });
};

export const POST = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken");
  if (accessToken) {
    const password = Decrypt(accessToken, process.env.PASSWORD);
    if (password === process.env.PASSWORD) {
      const data = await req.json();
      const result = await setConfig(
        "config.json",
        JSON.stringify(data, null, 2)
      );
      return NextResponse.json({
        data: result,
        success: true,
        message: "success",
      });
    } else {
      return NextResponse.json({
        data: 1,
        success: false,
        message: "fail",
      });
    }
  }
  return NextResponse.json({
    data: 0,
    success: false,
    message: "fail",
  });
};
