
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
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
