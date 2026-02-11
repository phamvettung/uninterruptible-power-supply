<div align="center">
 <h1>SUPERVISORY CONTROL AND DATA ACQUISITION ON ELECTRICITY IN INDUSTRIAL PLANTS</h1>
 <h2>HỆ THỐNG ĐIỀU KHIỂN, GIÁM SÁT VÀ THU THẬP DỮ LIỆU ĐIỆN NĂNG TIÊU THỤ TRONG XÍ NGHIỆP CÔNG NGHIỆP</h2>
</div>

## Contents
- [1. Abstract](#i-abstract)
- [2. Design of Uninterruptible Power Supply for an Industrial Plant](#ii-design-of-uninterruptible-power-supply-for-an-industrial-plant)
- [3. Design of Control cabinet](#iii-design-of-control-cabinet)
- [4. SCADA for Power System](#iv-supervisory-control-and-data-acquisition-for-power-system)
- [5. Demonstration](#v-demonstration)
- [6. Requirements](#vi-requirements)
- [7. References](#vii-references)

# I. ABSTRACT
<div>
 <p>This project is a modern SCADA model for the electrical system of an industrial plant. The model is developed based on the TCP/IP protocol, with the advantage stability, flexibility in building your own protocol and real-time communication.</p>
<p>Dự án là mô hình SCADA hiện đại cho một Xí nghiệp công nghiệp. Mô hình được phát triển dựa trên giao thức TCP/IP, với ưu điểm ổn định, linh hoạt trong việc tự định nghĩa giao thức và khả năng truyền thông theo thời gian thực.</p>
</div>

# II. DESIGN OF UNINTERRUPTIBLE POWER SUPPLY FOR AN INDUSTRIAL PLANT
<div>
 <p>Design a power supply for an industrial enterprise comprising 6 workshops, with power sourced from a 22kV connection point. Maximum power usage time Tmax = 5100 hours. Type I and Type II loads account for 75%. The calculated data is shown below.</p>
<p>Thiết kế hệ thống cấp điện cho một Xí nghiệp công nghiệp gồm 6 Phân xưởng, nguồn điện được lấy từ điểm đấu điện của lưới 22kV. Thời gian sử dụng công suất tối đa Tmax = 5100h. Phụ tải loại I, loại II chiếm 75%. Các số liệu tính toán được thể hiện ở bên dưới.</p>
<p align="center">
  <img src="assets/electrical_calculation3.jpg" alt="hi" width="840" height="540">
</p>

#### a. Xác định phụ tải tính toán của toàn Xí nghiệp

**- Hệ số sử dụng của toàn Xí nghiệp:**

$$
K_{sd}XN = \frac{\sum (S_i \times K_{sd,i})}{\sum S_i} = 0.566
$$

**- Hệ số nhu cầu của Xí nghiệp:**

$$
K_{nc}XN = 0.566 + \frac{(1 - 0.566)}{\sqrt(6)} = 0.743
$$

**- Hệ số công suất trung bình của toàn Xí nghiệp:**

$$
\cos \varphi XN = \frac{\sum (S_i \times \cos_{\varphi,i})}{\sum S_i} = 0.75 => \sin \varphi = \sqrt{1-\cos^2 \varphi} = 0.66
$$

**- Tổng công suất tính toán của toàn Xí nghiệp:**

$$
S_{XN} = K_{nc}XN \times \sum S_i = 0.743 \times 386.75 = 287.48 kVA
$$

$$
P_{XN} = S_{XN} \times \cos \varphi_{XN} = 0.75 \times 287.48 = 215.781 kW
$$

$$
Q_{XN} = S_{XN} \times \sin \varphi_{XN} = 0.66 \times 287.48 = 189.95 kVAr
$$

**- Chọn dây dẫn từ nguồn đến trạm biến áp:**

>>Dòng điện chạy trên dây dẫn

$$
   I = \frac{S_{XN}}{\sqrt(3) \times U} = \frac{287.48}{\sqrt(3) \times 22} = 7.544 A
$$

>>Tiết diện dây nhôm theo mật độ dòng điện kinh tế (Jkt = 1.2 A/mm2). Đối với đường dây cao áp tiết diện tối thiểu không nhỏ hơn 35mm2 => Ta chọn dây AC-35 nối từ nguồn vào trạm biến áp

$$
   F = \frac{I}{J_{kt}} = \frac{7.544}{1.2} = 6.28 \text{mm}^2
$$

#### b. Chọn máy biến áp

>>Ta có tổng công suất tính toán toàn Xí nghiệp (chưa kể đến hao tổn công suất trên đường đây) = 287.48 kVA, thời gian sử dụng công suất tối đa = 5100 h

**- Công suất trung bình**

$$
   S_{tb} = \frac{S_{XN} \times T_{max}}{8760} = \frac{287.48 \times 5100}{8760} = 167.36 kVA
$$

**- Hệ số điền kín đồ thị phụ tải = 0.58 < 0.75. Như vậy máy biến áp có thể làm việc quá tải 40% (kqt = 1.4) trong một thời gian xác định**

$$
   k_{đk} = \frac{S_{tb}}{S_{XN}} = \frac{167.63}{287.48} = 0.58
$$

=> Chọn 02 máy biến áp có công suất định mức 2 x 250 kVA, hệ số quá tải = 1.59 nhỏ hơn 1.4 => đảm bảo yêu cầu

$$
   k_{qt}= \frac{S_{XN}}{S_{nBA}} = \frac{287.48}{250} = 0.99 < 1.4
$$

**- Tham số của máy biến áp dòng THIBIDI: công suất định mức 250 kVA, điện áp ngắn mạch phần trăm Uk% = 4**

>>Tổn hao công suất không tải và tổn hao ngắn mạch (P0, Pk)

$$
   \Delta P_{0}= 0.34 kW
$$

$$
   \Delta P_{k}= 2.6 kW
$$

**- Tính toán trong máy biến áp:**

>>Điện trở biến áp

$$
   R_{BA} = \frac{\Delta P_k}{3 \times I_{đm}^2} = \frac{2.6}{3 \times 360.84^2} = 0.0067 \Omega
$$

>>Tổng trở biến áp

$$
   Z_{BA} = \frac{\Delta U_k \cdot U^2}{100 * S_{BA}} = \frac{4 \cdot 0.4^2}{100 * 250} = 0.0256 \Omega
$$

>>Điện kháng biến áp

$$
   X_{BA} = \sqrt(0.0067^2 - 0.0256^2) = 0.0247 \Omega
$$

**- Tính toán ngắn mạch:**
>>Dòng điện định mức của biến áp:

$$
   I_{đm}BA = \frac{S_{đm}BA}{\sqrt(3) \times U} = \frac{250}{\sqrt(3) \times 0.4} = 360.84 A
$$

>>Dòng điện ngắn mạch 3 pha tại thanh cái hạ áp của biến áp (N1):

$$
   I_{sc}N1= \frac{I_{đm}BA}{Uk%} = \frac{360.84}{0.04} = 9.021 kA
$$

>>Tính toán ngắn mạch cho phụ tải ở xa trạm biến áp nhất (Phân xưởng 01, điểm N2): dây đồng 35mm2, chiều dài 160m, điện trở suất dây đồng = 0.0178, điện kháng Xd = 0.00008

$$
   R_{tổng} = R_{BA} + \rho \times \frac{l}{35} = 0.0067 + 0.0813 = 0.088 \Omega
$$

$$
   X_{tổng} = X_{BA} + Xd \times l = 0.0247 + 0.00008 \times 160 = 0.0357 \Omega
$$

$$
   Z_{tổng} = \sqrt((0.088)^2 + (0.0357)^2) = 0.094 \Omega
$$

>>Dòng điện ngắn mạch 3 pha tại điểm N2:

$$
   I_{sc}N2 = \frac{U}{\sqrt(3) \times Z_{tổng}} = \frac{400}{\sqrt(3) \times 0.094} = 2.45 kA
$$

#### c. Chọn thanh cái hạ áp của trạm biến áp

**- Dòng điện chạy qua thanh cái**

$$
   I = \frac{S_{XN}}{\sqrt(3) \times U} = \frac{287.47}{\sqrt(3) \times 0.4} = 414.93 A
$$

>>Chọn thanh cái dẹt bằng đồng có Jkt = 1.8 A/mm2, tiết diện dây cần thiết cho thanh cái:

$$
   F = \frac{I}{J_{kt}} = \frac{414.93}{1.8} = 230.51 \text{mm}^2
$$

>>Chọn thanh cái có kích thước 50x6 = 300 mm2

<h3>1. Selecting MCCB and ACB</h3>
 <table align="center">
  <thead>
    <tr>
      <th>Cabinet ID</th>
      <th>Cabinet Name</th>
      <th>Device Name</th>
      <th>Itt, A</th>
      <th>In, kA</th>
      <th>UdmCB, V</th>
      <th>IdmCB, A</th>
      <th>InCB, kA</th>
      <th>Manufacture</th>
      <th>Type</th>
      <th>Code</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TPP01</td>
      <td>Tủ Phân phối 01</td>
      <td>ACB 01</td>
      <td>414.93</td>
      <td>9.021</td>
      <td>690</td>
      <td>630</td>
      <td>65</td>
      <td>MITSUBISHI</td>
      <td>NCT06</td>
      <td>AE630-SW</td>
    </tr>
    <tr>
      <td>TPP02</td>
      <td>Tủ Phân phối 02</td>
      <td>ACB 02</td>
      <td>414.93</td>
      <td>9.021</td>
      <td>690</td>
      <td>630</td>
      <td>65</td>
      <td>MITSUBISHI</td>
      <td>NCT06</td>
      <td>AE630-SW</td>
    </tr>
    <tr>
      <td>MC 03</td>
      <td>Máy Cắt 03</td>
      <td>ACB 03</td>
      <td>414.93</td>
      <td>9.021</td>
      <td>690</td>
      <td>630</td>
      <td>65</td>
      <td>MITSUBISHI</td>
      <td>NCT06</td>
      <td>AE630-SW</td>
    </tr>
    <tr>
      <td>MDB 01</td>
      <td>Tủ Phân xưởng 01</td>
      <td>MCCB 01</td>
      <td>110.17</td>
      <td>2.45</td>
      <td>690</td>
      <td>160</td>
      <td>36</td>
      <td>MITSUBISHI</td>
      <td>NF-S TYPE</td>
      <td>NF250-SV</td>
    </tr>
    <tr>
      <td>MDB 02</td>
      <td>Tủ Phân xưởng 02</td>
      <td>MCCB 02</td>
      <td>113.43</td>
      <td>2.45</td>
      <td>690</td>
      <td>160</td>
      <td>36</td>
      <td>MITSUBISHI</td>
      <td>NF-S TYPE</td>
      <td>NF250-SV</td>
    </tr>
    <tr>
      <td>MDB 03</td>
      <td>Tủ Phân xưởng 03</td>
      <td>MCCB 03</td>
      <td>103.75</td>
      <td>2.45</td>
      <td>690</td>
      <td>160</td>
      <td>36</td>
      <td>MITSUBISHI</td>
      <td>NF-S TYPE</td>
      <td>NF250-SV</td>
    </tr>
    <tr>
      <td>MDB 04</td>
      <td>Tủ Phân xưởng 04</td>
      <td>MCCB 04</td>
      <td>103.71</td>
      <td>2.45</td>
      <td>690</td>
      <td>160</td>
      <td>36</td>
      <td>MITSUBISHI</td>
      <td>NF-S TYPE</td>
      <td>NF250-SV</td>
    </tr>
    <tr>
      <td>MDB 05</td>
      <td>Tủ Phân xưởng 05</td>
      <td>MCCB 05</td>
      <td>60.74</td>
      <td>2.45</td>
      <td>690</td>
      <td>160</td>
      <td>36</td>
      <td>MITSUBISHI</td>
      <td>NF-S TYPE</td>
      <td>NF250-SV</td>
    </tr>
    <tr>
      <td>MDB 06</td>
      <td>Tủ Phân xưởng 06</td>
      <td>MCCB 06</td>
      <td>99.26</td>
      <td>2.45</td>
      <td>690</td>
      <td>160</td>
      <td>36</td>
      <td>MITSUBISHI</td>
      <td>NF-S TYPE</td>
      <td>NF250-SV</td>
    </tr>
  </tbody>
</table>
 <h3>2. Principle diagram of the distribution station</h3>
 <p>The distribution substation is designed with two 250 kVA, Y/Y, 22/0.4kV transformers connected to busbars C1 and C2 of size 50x6 mm2. The conductors from the power source to the substation are AC-35 aluminum wires.. A connecting circuit breaker (ACB 03) connects two busbars. In case of a fault or when maintenance or transformer replacement is needed. One of the two Circuit breakers will trip, and Circuit breaker 03 will close to power supply on the other side.</p>
 <p>Trạm phân phối được thiết kế với 02 máy biến áp 250 kVA, Y/Y, 22/0.4kV kết nối tới 02 thanh cái C1 và C2 kích thước 50x6 mm2, dây dẫn từ nguồn tới trạm biến áp là dây nhôm AC-35. Một máy cắt liên lạc ACB 03 nối giữa 2 thanh cái. Khi có sự cố hay cần bảo trì, thay thế máy biến áp, 1 trong 2 máy cắt ngắt điện, máy cắt 03 sẽ đóng để cấp nguồn cho các phụ tải phía bên kia.</p>
 <p align="center">
  <img src="assets/distribution-station-principle.PNG" alt="hi" width="840" height="540">
</p>
</div>

# III. DESIGN OF CONTROL CABINET
<div>
 <p>In this project, a PLC FX5UJ is used to control 03 main circuit breakers. Retrieve the on/off status of 03 ACBs and 06 MCCBs. The FX5-485ADP module is used to communicate with the electricity meters via the RS-485 protocol. College data of the current, voltage, power, energy consumption.</p>
 <p>Dự án sử dụng PLC FX5UJ để điều khiển 03 máy cắt chính. Nhận tín hiệu trạng thái ON/OFF của 03 ACB và 06 MCCB. Module truyền thông FX5-485ADP được sử dụng để kết nối với các đồng hồ đo điện, thu thập dữ liệu năng lượng: dòng điện, điện áp, công suất tức thời, điện năng tiêu thụ.</p>
<h3>1. Control cabinet layout</h3>
 <p align="center">
  <img src="assets/internal-cabinet-layout.PNG" alt="hi" width="840" height="540">
</p>
 <h3>2. AC Power Distribution</h3>
 <p align="center">
  <img src="assets/ac-power-distribution.PNG" alt="hi" width="840" height="540">
</p>
  <h3>3. DC Power Distribution</h3>
 <p align="center">
  <img src="assets/dc-power-distribution.PNG" alt="hi" width="840" height="540">
</p>
<h3>4. Input wiring</h3>
 <p align="center">
  <img src="assets/input-wiring.PNG" alt="hi" width="840" height="540">
</p>
<h3>5. Output wiring</h3>
 <p align="center">
  <img src="assets/output-wiring.PNG" alt="hi" width="840" height="540">
</p>
 <h3>6. Terminal to ACBs and MCCBs</h3>
 <p align="center">
  <img src="assets/terminal-to-cb.PNG" alt="hi" width="840" height="540">
</p>
 <h3>7. Fx5-485ADP to the electrical meters</h3>
 <p align="center">
  <img src="assets/fx485adp-to-electrical-meters.PNG" alt="hi" width="840" height="540">
</p>
</div>

# IV. SUPERVISORY CONTROL AND DATA ACQUISITION FOR POWER SYSTEM
<div>
  <p>The SCADA software used to control and monitor equipment remotely via a Web browser. Energy data is collected automatically in real time. All the technologies used and communication protocols are presented below.</p>
 <p>Phần mềm SCADA sử dụng để điều khiển, giám sát trạng thái của thiết bị từ xa trên trình duyệt Web. Dữ liệu về năng lượng được thu thập tự động theo thời gian thực. Các công nghệ sử dụng và giao thức truyền thông được mô tả bên dưới đây.</p>
<h3>1. Diagram of Technology</h3>
<p>The PLC controller communicates with the server via a TCP socket (TCP/IP). The server provides APIs and WebSockets for the users side to send and receive data.The PLC connects to field devices via RS-485 communication standard and input/output ports.</p>
 <p>Bộ điều khiển PLC truyền thông với Server thông qua kết nối TCP/IP. Server cung cấp các API và WebSocket để User có thể gửi và nhận dữ liệu. PLC kết nối tới các thiết bị ở hiện trường thông qua chuẩn truyền thông Modbus RS-485 và các cổng vào/ra số.</p>
<p align="center">
  <img src="assets/tech_diagram3.PNG" alt="hi" width="840" height="540">
</p>

<h3>2. Technologies Used</h3>
<p>The server-side (back-end) is built on Spring Boot Framework. The client-side (front-end) is built on ReactJS. This project also uses the Redis database management system, storing key-value data in RAM, resulting in fast query speeds and reduce the number of requests that need to be processed by the main server.</p>
 <p>Phía Back-end được xây dựng trên nền tảng Spring Boot và phía Front-end được xây dựng dựa trên thư viện ReactJS. Dự án cũng sử dụng hệ quản trị cơ sở dữ liệu Redis, lưu dữ liệu dạng key-value trên RAM, cho tốc độ truy vấn nhanh và giảm số lượng request tới MySQL</p>
<p align="center">
  <img src="assets/tech_used.PNG" alt="hi" width="840" height="540">
</p>

<h3>3. Table structure in Database</h3>
<p>The database management system used in the project is MySQL, which includes 10 tables:</p>
<ul>
  <li>Tables users, user_role, role: for security, authentication, and user authorization features.</li>
  <li>Table cabinet: for managing electrical cabinets (TPP, MDB).</li>
  <li>Table device: for managing devices (ACB, MCCB).</li>
  <li>Table energy: for collecting energy data.</li>
  <li>Table tokens: for storing refresh token.</li>
  <li>Table alarm, alarm_type, alarm_history: for alarm feature.</li>
</ul>
<p>Hệ quản trị cơ sở dữ liệu sử dụng trong dự án là MySQL gồm 10 bảng:</p>
<ul>
  <li>Bảng users, user_role, role: cho tính năng bảo mật, xác thực và phân quyền người dùng.</li>
  <li>Bảng cabinet: quản lý tủ điện (TPP, MDB).</li>
  <li>Bảng device: quản lý thiết bị (ACB, MCCB).</li>
  <li>Bảng energy: thu thập dữ liệu về năng lượng.</li>
  <li>Bảng tokens: lưu trữ refresh token.</li>
  <li>Bảng alarm, alarm_type, alarm_history: cho tính năng cảnh báo.</li>
</ul>
<p align="center">
  <img src="assets/upssdb.PNG" alt="hi" width="840" height="540">
</p>

<h3>4. Authentication, Authorization and Security (Spring Security JWT)</h3>
<p>SCADA software provides authentication features, user authorization and APIs security to protect applications from common threats such as CSRF, XSS, etc.</p>
<p>Phần mềm SCADA cung cấp các tính năng xác thực (ai là user), phân quyền (bạn được phép làm gì) và bảo mật các API để bảo vệ ứng dụng khỏi các mối đe dọa phổ biến như CSRF, XSS, etc. </p>
<p align="center">
  <img src="assets/security4.PNG" alt="hi" width="740" height="1040">
</p>

<h3>5. PLC-Server Protocol</h3>
<p>A message used to transmit and receive data between a PLC and a server is defined by a byte array. Each message sent has a start (STX) and end character (ETX).</p>
<p>Một bức điện có định dạng là mảng các byte dùng để truyền và nhận dữ liệu giữa PLC và Server. Mỗi bức điện gửi đi đều có kí tự bắt đầu (STX) và kí tự kết thúc (ETX).</p>
<p align="center">
  <img src="assets/plc_api_spec2.jpg" alt="hi" width="840" height="540">
</p>

<h3>6. Server-User Protocol</h3>
<p>The messages sent and received between the server and the user are in the format of a JSON like this.</p>
<p>Thông điệp để truyền và nhận dữ liệu giữa Server và User có định dạng là một chuỗi JSON như bên dưới.</p>

```sh
{
 "messageType": "DEEN",
 "data": {
    "deviceId": 1,
    "current": 6,
    "voltage": 380,
    "power": 2280,
    "energy": 10000,
 }
}
```
<h3>7. Dashboard</h3>
<p>The Dashboard page displays a monthly energy consumption breakdown for the year, yesterday's and today's energy usage, and the electricity bill amount.</p>
<p>Trang Dashboard hiển thị bảng thống kê điện năng hàng tháng trong năm, mức tiêu thụ điện năng ngày hôm qua và trong ngày hôm nay, cùng với số tiền điện phải chi trả.</p>
<p align="center">
  <img src="assets/dashboard3.PNG" alt="hi" width="840" height="540">
</p>

<h3>8. Power Supply Diagram</h3>
<p>The Power Supply Diagram page displays the principle diagram of the distribution substation with the parameters of the connected devices in the circuit. It displays energy data and controls for opening/closing the ACBs.</p>
<p>Trang Power Supply Diagram cung cấp sơ đồ nguyên lý của trạm phân phối và các thông số của thiết bị điện. Hiển thị giá trị năng lượng tức thời và có thể điều điều khiển AUTO/MANUAL đóng, ngắt 03 máy cắt.</p>
<p align="center">
  <img src="assets/power_supply_diagram2.PNG" alt="hi" width="840" height="540">
</p>

<h3>9. Real-time Trend</h3>
<p>The Real-time Trend page displays energy graphs of loads: instantaneous current, instantaneous voltage, power consumption, and energy consumption over time.</p>
<p>Trang Real-time Trend hiển thị biểu đồ năng lượng của từng Phân xưởng: Dòng điện tức thời, điện áp tức thời, công suất tiêu thụ và điện năng tiêu thụ theo thời gian thực.</p>
<p align="center">
  <img src="assets/real_time_trend4.PNG" alt="hi" width="840" height="540">
</p>

<h3>10. Analysis</h3>
<p>The Analysis page provides a chart showing the daily energy consumption statistics for each load.</p>
<p>Trang Analysis cung cấp biểu đồ thống kê năng lượng tiêu thụ của từng Phân xưởng theo ngày.</p>
<p align="center">
  <img src="assets/energy_statistic.PNG" alt="hi" width="840" height="540">
</p>

<h3>11. Alarm</h3>
<p>The Alarm page allows users to set alarm thresholds for daily electricity usage. Specifically:</p>
<ul>
  <li>-A: amount of electricity used up to this point.</li>
  <li>-A0: amount of electricity used yesterday.</li>
  <li>-Accumulated electricity during the day = A - A0.</li>
</ul>
<p>Trang Alarm cho phép người dùng cài đặt ngưỡng cảnh báo về mức sử dụng điện năng trong ngày. Trong đó:</p>
<ul>
  <li>-A: số điện năng đã tiêu thụ tính đến thời điểm hiện tại.</li>
  <li>-A0: số điện năng đã tiêu thụ ngày hôm qua.</li>
  <li>-Điện năng tích lũy trong ngày = A - A0.</li>
</ul>
<p align="center">
  <img src="assets/energy_check.PNG" alt="hi" width="840" height="540">
</p>

<h3>12. Managerment</h3>
<p>Manages data on the installed capacity of each load, parameters of selected ACBs and MCCBs, account settings, along with search functionality combined with pagination.</p>
<p>Quản lý dữ liệu về công suất đặt của từng Phân xưởng, thống số của ACB, MCCB đã chọn, cài đặt tài khoản, cùng với chức năng tìm kiếm kết hợp phân trang.</p>
<p align="center">
  <img src="assets/cabinet.PNG" alt="hi" width="840" height="540">
</p>

</div>

# V. DEMONSTRATION
<div>

<p align="center">
  <a href="https://www.youtube.com/watch?v=00z3u6Ofh6w&t=75s">
    <img src="assets/youtube-icon.png" width="300" alt="PC Demo">
  </a>
</p>

<h3>MOBILE FRIENDLY</h3>
<p align="center">
  <a href="https://www.youtube.com/watch?v=aQUQzm_U8xE">
    <img src="assets/youtube-icon.png" width="300" alt="Mobile Demo">
  </a>
</p>
 
</div>

# VI. REQUIREMENTS
<div>
<p>Back-end</p>
<ul>
  <li>Spring Boot 3.5.6</li>
  <li>Tomcat server 10.1.31</li>
  <li>MySQL</li>
  <li>Spring Boot Security</li>
  <li>Spring Boot WebSocket</li>
  <li>Spring Data JPA</li>
  <li>Hibernate core 6.6.18</li>
  <li>Lombok</li>
  <li>Spring Boot Validation</li>
  <li>Json Webtoken 0.9.1</li>
</ul>
<p>Front-end</p>
<ul>
  <li>React 18.3.1</li>
  <li>Docker</li>
  <li>Axios 1.13.2</li>
  <li>React redux 9.2.0</li>
  <li>React router 7.9.6</li>
  <li>React charts 3.5.1</li>
  <li>Sockjs client 1.6.1</li>
  <li>Ant design 5.28.1</li>
  <li>Vite Tailwindcss 4.1.17</li>
</ul>
<p>PLCs</p>
<ul>
  <li>PLC FX5UJ MITSUBISHI</li>
  <li>Socket TCP programming</li>
  <li>Modbus RS-485 communication</li>
</ul>
<p>Languages: Java, JavaScript, HTML & CSS, JSX</p>

# VII. REFERENCES
[1] Cuốn Bài tập Cung Cấp Điện - TS. Trần Quang Khánh



