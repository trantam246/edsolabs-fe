## Student Listing

Thực hành xử lí dữ liệu từ danh sách cho trước

### Yêu cầu
- Sử dụng `json-server` để dựng local server với data đính kèm (file)
- Dùng React Create App để tạo dự án React
- Sử dụng các component default của Marterial UI hoặc React Boostrap để xây dựng giao diện
- Có sử dụng Tabs Component
- (Optional) Sử dụng `json-server-auth` để tiến thực hiện login/logout

### Mô tả 
- Người dùng nhấn vào tab để chuyển đổi giữa 2 screen `Student List` và `Teams`
- Screen Student List : 
    + Thực hiện xử lí data get được từ api để đổ vào bảng.
    + First Name, Last Name sẽ được tách từ Full Name
    + Gender: M - Male,  F - Female
    + Age: được tính từ ngày tháng năm sinh
    + Người dùng có thể nhập tên, chọn giới tính, nhập tuổi sau đó nhấn icon kính lúp để thực hiện search.
    + Bấm `Load more student` để load thêm data, mỗi lần bấm sẽ load thêm `6` items, nếu không còn items nào nữa thì disable nút `Load more student`
- Screen Teams:
    + Chia nhóm data
	+ Đề bài: 
	    + Thực hiện chia học sinh thành 5 nhóm, mỗi nhóm 5 người, trong một nhóm phải bao gồm đủ các rank từ 1 -> 5
	+ Gợi ý: có thể dựa trên trung bình cộng `Rank` của tất cả học sinh

### Kiến thức áp dụng
- Sử dụng Marterial UI/React bootstrap
- Sử dụng các hàm cộng trừ/chuyển đổi ngày tháng để tính tuổi
- Sử dụng các array methods để thực hiện search, chia teams
- (Optional) Lưu trữ dữ liệu ở phía client side vớI `local storage`