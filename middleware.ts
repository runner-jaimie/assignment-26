import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  //console.log(session);

  // 이 말은 유저가 로그아웃 했다는 이야기 다음 단계는 유저가 어디로 가려고 하는지 알아야 한다. 이걸 찾기 위해서 public으로 접근 가능한 url을 담은 object를 만든다.
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // if (exists) {
    //   return NextResponse.redirect(new URL("/profile", request.url));
    // }
  }
  // const pathname = request.nextUrl.pathname;
  // if (pathname === "/") {
  //   const response = NextResponse.next();
  // }
  // if (pathname === "/profile") {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
}

// 미들웨어는 모든 리퀘스트에 실행된다. 페이지 변경을 위한 리퀘스트 뿐만 아니라.

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
