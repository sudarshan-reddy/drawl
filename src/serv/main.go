package main

import("net/http"
	"os"
)

func main() {
	fs := http.FileServer(http.Dir("/app/src/serv/static"))
	port := os.Getenv("PORT")
	//fs = http.FileServer(http.Dir("static"))

	if port == "" {
		port = "5000"	
	}
	
	http.Handle("/" , fs)
	http.ListenAndServe(":" + port , nil)
}
