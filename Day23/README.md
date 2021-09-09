// Day 23 - 09/09/2021
----Overview-----
1. React Components
  * Learn to make React Components, the building blocks of all React.js application
2. React Props
  * Learn how to make React components interact with one another.
3. React State
4. React Lifecycle
5. React Hook


// homework
Sử dụng ReactJS để làm ứng dụng xem thời tiết trong vòng 5 ngày của 1 thành phố bất kỳ trên thế giới dựa trên bố cục của wirefame được cung cấp

## Yêu cầu:
- Đăng ký và lấy API thời tiết tại: https://www.weatherapi.com/signup.aspx
- Tài liệu mô tả API tại: https://www.weatherapi.com/docs/
- Dùng React Create App để tạo dự án React
- Sử dụng Material UI làm giao diện
- Sử dụng environment để thiết lập API url, tên tác giả
- Footer có dòng chữ: "© 2021 by FE class. Made with love by {YOUR_NAME}", thì {YOUR_NAME} sẽ được fill từ biến environment, bấm vào sẽ mở modal như page 4

## Mô tả các trang
Page 1: Giao diện mặc định của ứng dụng (yêu cầu form căn giữa màn hình)
Page 2: Gõ tên thành phố vào ô tìm kiếm và bấm Enter, hệ thống sẽ gọi Ajax lên weather API để lấy thông tin. Hiển thị loading như trong hình minh hoạ, nếu thành công chuyển sang page 3, nếu không thì hiển thị thông tin báo lỗi
Page 3: Hiển thị thông tin dự báo thời tiết ngày hôm nay của thành phố được chọn, box bên dưỚi hiển thị dự báo cho 5 ngày tiếp theo
Page 4: Hiển thị modal về thông tin tác giả. Bạn hãy chọn 1 bức ảnh đẹp nhất của bản thân + đôi lời giới thiệu về mình nhé ;-)

## Lưu ý: 
- Không nhất thiết phải làm chuyển page, có thể ẩn hiện các component
- Components:
    + Search component
    + Today weather component
    + Next 5-day component
    + Footer component