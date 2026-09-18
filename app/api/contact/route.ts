import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      mobileNumber,
      country,
      service,
      otherService,
      appointmentDate,
      appointmentTime,
      email,
    } = body;

    if (!fullName || !mobileNumber || !email) {
  return Response.json(
    {
      success: false,
      message: "Please fill Name, Mobile Number and Email.",
    },
    { status: 400 }
  );
}

const safeCountry = country || "Not specified";
const safeService = service || "Not specified";
const safeOtherService = otherService || "Not specified";
const safeAppointmentDate = appointmentDate || "Not selected";
const safeAppointmentTime = appointmentTime || "Not selected";

    const selectedService =
  safeService === "Other"
    ? `Other: ${safeOtherService}`
    : safeService;

    const { data, error } = await resend.emails.send({
      from: "Infinity Digital Marketing <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL!],
      replyTo: email,
      subject: `New Query Received — ${fullName}`,

      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Query Received</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:#03050a;
  font-family:Arial, Helvetica, sans-serif;
  color:#ffffff;
">

  <div style="
    width:100%;
    background:#03050a;
    padding:40px 15px;
    box-sizing:border-box;
  ">

    <div style="
      max-width:700px;
      margin:0 auto;
      background:#080c14;
      border:1px solid #1b2638;
      border-radius:20px;
      overflow:hidden;
      box-shadow:0 20px 60px rgba(0,0,0,0.45);
    ">

      <!-- HEADER -->

      <div style="
        padding:30px;
        background:linear-gradient(
          135deg,
          #071018 0%,
          #0a1524 45%,
          #10152b 100%
        );
        border-bottom:1px solid #1b2638;
      ">

        <div style="
          text-align:center;
          margin-bottom:22px;
        ">
          <img
            src="${logoUrl}"
            alt="Infinity Digital Marketing"
            width="72"
            style="
              display:block;
              width:72px;
              height:72px;
              object-fit:contain;
              margin:0 auto;
            "
          />
        </div>

        <div style="
          text-align:center;
          color:#00d9ff;
          font-size:12px;
          font-weight:700;
          letter-spacing:2px;
          text-transform:uppercase;
          margin-bottom:10px;
        ">
          INFINITY DIGITAL MARKETING
        </div>

        <h1 style="
          margin:0;
          text-align:center;
          color:#ffffff;
          font-size:30px;
          line-height:1.2;
          font-weight:800;
        ">
          New Query Received
        </h1>

        <p style="
          margin:10px 0 0;
          text-align:center;
          color:#ffffff;
          font-size:14px;
        ">
          A new enquiry has been submitted through your website.
        </p>

      </div>


      <!-- CONTENT -->

      <div style="
        padding:32px;
      ">

        <div style="
          font-size:13px;
          font-weight:700;
          color:#00d9ff;
          letter-spacing:1.5px;
          text-transform:uppercase;
          margin-bottom:18px;
        ">
          CLIENT DETAILS
        </div>


        <div style="
          background:#0c121d;
          border:1px solid #1d293a;
          border-radius:14px;
          overflow:hidden;
        ">

          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="border-collapse:collapse;"
          >

            <tr>
              <td style="
                padding:15px 18px;
                color:#ffffff;
                font-size:14px;
                font-weight:700;
                border-bottom:1px solid #1b2638;
                width:38%;
              ">
                Full Name
              </td>

              <td style="
                padding:15px 18px;
                color:#ffffff;
                font-size:14px;
                border-bottom:1px solid #1b2638;
              ">
                ${fullName}
              </td>
            </tr>


            <tr>
              <td style="
                padding:15px 18px;
                color:#ffffff;
                font-size:14px;
                font-weight:700;
                border-bottom:1px solid #1b2638;
              ">
                Mobile Number
              </td>

              <td style="
                padding:15px 18px;
                color:#ffffff;
                font-size:14px;
                border-bottom:1px solid #1b2638;
              ">
                ${mobileNumber}
              </td>
            </tr>


            <tr>
              <td style="
                padding:15px 18px;
                color:#ffffff;
                font-size:14px;
                font-weight:700;
                border-bottom:1px solid #1b2638;
              ">
                Country
              </td>

              <td style="
                padding:15px 18px;
                color:#ffffff;
                font-size:14px;
                border-bottom:1px solid #1b2638;
              ">
                ${safeCountry}
              </td>
            </tr>


            <tr>
              <td style="
                padding:15px 18px;
                color:#ffffff;
                font-size:14px;
                font-weight:700;
                border-bottom:1px solid #1b2638;
              ">
                Email
              </td>

              <td style="
                padding:15px 18px;
                font-size:14px;
                border-bottom:1px solid #1b2638;
              ">
                <a
                  href="mailto:${email}"
                  style="
                    color:#00d9ff;
                    text-decoration:none;
                  "
                >
                  ${email}
                </a>
              </td>
            </tr>


            <tr>
              <td style="
                padding:15px 18px;
                color:#ffffff;
                font-size:14px;
                font-weight:700;
                border-bottom:1px solid #1b2638;
              ">
                Service
              </td>

              <td style="
                padding:15px 18px;
                color:#ffffff;
                font-size:14px;
                border-bottom:1px solid #1b2638;
              ">
                ${selectedService}
              </td>
            </tr>


            <tr>
              <td style="
                padding:15px 18px;
                color:#ffffff;
                font-size:14px;
                font-weight:700;
                border-bottom:1px solid #1b2638;
              ">
                Appointment Date
              </td>

              <td style="
                padding:15px 18px;
                color:#ffffff;
                font-size:14px;
                border-bottom:1px solid #1b2638;
              ">
                ${safeAppointmentDate}
              </td>
            </tr>


            <tr>
              <td style="
                padding:15px 18px;
                color:#ffffff;
                font-size:14px;
                font-weight:700;
              ">
                Appointment Time
              </td>

              <td style="
                padding:15px 18px;
                color:#ffffff;
                font-size:14px;
              ">
                ${safeAppointmentTime}
              </td>
            </tr>

          </table>

        </div>


        <!-- WEBSITE BUTTON -->

        <div style="
          text-align:center;
          margin-top:35px;
        ">

          <a
            href="${websiteUrl}"
            target="_blank"
            style="
              display:inline-block;
              padding:14px 26px;
              border-radius:10px;
              background:linear-gradient(
                90deg,
                #00d9ff,
                #4d7cff,
                #8b4dff
              );
              color:#ffffff;
              text-decoration:none;
              font-size:14px;
              font-weight:800;
            "
          >
            VISIT INFINITY WEBSITE →
          </a>

        </div>


        <!-- WEBSITE LINK -->

        <div style="
          text-align:center;
          margin-top:18px;
        ">

          <a
            href="${websiteUrl}"
            target="_blank"
            style="
              color:#ffffff;
              font-size:13px;
              text-decoration:none;
              word-break:break-all;
            "
          >
            ${websiteUrl}
          </a>

        </div>

      </div>


      <!-- FOOTER -->

      <div style="
        padding:22px 30px;
        background:#05080e;
        border-top:1px solid #1b2638;
        text-align:center;
      ">

        <div style="
          color:#ffffff;
          font-size:13px;
          font-weight:700;
          margin-bottom:6px;
        ">
          INFINITY DIGITAL MARKETING
        </div>

        <div style="
          color:#ffffff;
          font-size:12px;
          line-height:1.6;
        ">
          Digital marketing built for brands that want to go beyond.
        </div>

      </div>

    </div>

  </div>

</body>
</html>
`,
});

    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        {
          success: false,
          message: "Email could not be sent.",
        },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "Consultation request sent successfully.",
      data,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}

const logoUrl =
  "https://raw.githubusercontent.com/girimarketingagency01-dev/demo-agency/main/public/logo.jpg";

const websiteUrl =
  "https://infinitydigitalmarketing.vercel.app/";