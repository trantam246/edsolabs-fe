+ Overview
  * Environment Variables
  * Use Axios With React
  * React Router

// Homework

<!-- Làm bài tập theo flie a Khánh đã gửi  -->

## Time tracker

Xây dựng ứng dụng bằng ReactJS để theo dõi & tổng hợp timesheet

### Yêu cầu
- Sử dụng `json-server` để dựng local server với data đính kèm (file)
- Dùng React Create App để tạo dự án React
- Sử dụng Material UI làm giao diện
- Sử dụng router để chuyển giữa các trang
- Giữ được trạng thái đăng nhập (lưu local storage), dù có refresh trang hay đóng trang rồi mở lại thì trạng thái vẫn phải được giữ

### Mô tả các trang
- Login: Khi vào ứng dụng, mặc định hệ thống sẽ kiểm tra xem user đã đăng nhập chưa, nếu chưa thì hiển thị trang đăng nhập, nếu rồi thì chuyển đến trang timer
- Timer: 
    + Người dùng có thể click vào chỗ có chữ `What are you working on?` để nhập mô tả task
    + Người dùng có thể click lên biểu tượng `tag` để chọn các tag có trong hệ thống
    + Mặc định thời gian sẽ là 00:00:00. Người dùng bấm vào nút start, thời gian bắt đầu tính, nút start chuyển thành nút stop
    + Khi người dùng bấm start, lập tức task này sẽ được tạo ở mục Today bên dưới với các thông tin như ngưỜi dùng đã nhập, cột thời gian hiển thị dạng giờ bắt đầu - giờ kết thúc. Nếu chưa kết thúc thì chỉ hiển thị giờ bắt đầu.
    + Action menu của từng task hiển thị tương ứng như hình minh hoạ. Nếu task đang chạy thì action menu có nút Stop. Nếu đang stop thì có nút Start
    + Bấm xoá task thì hiển thị hộp thoại xác nhận, yes thì xoá khỏi hệ thống
    + Trang listing sẽ nhóm các task lại theo các ngày trùng nhau. Nếu là ngày hiện tại thì hiển thị Today, nếu không thì hiển thị ngày
    + Mặc định hiển thị 5 nhóm ngày, bấm load more để tải thêm
    + Có thể chọn ngày cụ thể để xem các task
- Report:
    + Hiển thị biểu đồ, biểu diễn số giờ đã bỏ ra để làm các task.
    + Sử dụng [Donnut chart](https://www.chartjs.org/docs/next/charts/doughnut.html) để hiển thị tổng số giờ đã dùng chia theo % của từng tag (mỗi tag 1 màu)
    + Sử dụng [Barchart](https://www.chartjs.org/docs/next/charts/bar.html#horizontal-bar-chart) để hiển thị tổng số giờ đã dùng chia theo từng tag (mỗi tag 1 màu)
    + Cho phép người dùng lọc theo các tiêu chí:
      + Ngày hiện tại
      + Tuần hiện tại
      + Ngày hôm qua
      + Tuần trưỚc
      + Tháng này
      + Tháng trước
      + Tuỳ chọn ngày bắt đầu & kết thúc

### Kiến thức áp dụng
- Sử dụng Marterial UI/React bootstra
- Sử dụng các hàm cộng trừ/chuyển đổi ngày tháng. Tham khảo `momentjs`
- Thao tác dữ liệu dạng `CRUD` (Create - Read - Update - Delete) thông qua Restful API
- Lưu trữ dữ liệu ở phía client side vớI `local storage`