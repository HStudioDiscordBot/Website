"use client";
import Swal from 'sweetalert2'
import promptpay from 'promptpay-js';
import { QRCodeSVG } from 'qrcode.react';
import ReactDOMServer from 'react-dom/server';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { deleteCookie, getCookie } from 'cookies-next';

export default function Store() {
  const router = useRouter();

  const accessToken = getCookie("access_token");
  const currentLanguage = getCookie("language");

  const [account, setAccount]: any = useState({});
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    Swal.fire({
      icon: "info",
      title: currentLanguage === "thai" ? "กำลังโหลดรายการสินค้า" : "Loading items from store",
      text: currentLanguage === "thai" ? "กรุณารอสักครู่" : "Please wait a moment",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false
    });

    fetch("https://hstudio-api.hewkawar.xyz/store/items", {
      headers: {
        Authorization: `UserId ${account.id}`
      }
    }).then((val) => val.json())
      .then((data) => {
        Swal.close();
        setItemList(data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: currentLanguage == "thai" ? "ไม่สามารถดึงข้อมูลสินค้าได้" : "Unable to retrieve product information",
          text: currentLanguage == "thai" ? "กรุณาลองอีกครั้งภายหลัง" : "Please try again later.",
          confirmButtonText: currentLanguage == "thai" ? "ยืนยัน" : "Confirm",
          confirmButtonColor: "rgb(59 130 246)",
          willClose: ((popup) => {
            router.push("/")
          })
        });
      });
  }, [account, currentLanguage]);

  useEffect(() => {
    if (accessToken) {
      fetch("https://discord.com/api/v10/users/@me", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((res) => res.ok ? res.json() : null).then((value) => {
        if (!value) {
          deleteCookie("access_token");
        } else {
          setAccount(value);
        }
      })
    } else {

    }
  }, [accessToken]);

  function buy(itemId: string, price: string, item: string) {
    if (!account.id) {
      return Swal.fire({
        icon: "warning",
        title: currentLanguage == "thai" ? "คุณต้องเข้าสู่ระบบก่อนซื้อสินค้า" : "You must log in before purchasing."
      })
    }

    Swal.fire({
      icon: "question",
      title: currentLanguage == "thai" ? `คุณต้องการซื้อ ${item}?` : `Would you like to buy ${item}?`,
      text: `${price} THB`,
      confirmButtonText: currentLanguage == "thai" ? "ยืนยัน" : "Confirm",
      cancelButtonText: currentLanguage == "thai" ? "ยกเลิก" : "Cancel",
      confirmButtonColor: "rgb(59 130 246)",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "question",
          title: currentLanguage == "thai" ? "ช่องทางการชำระเงิน" : "Payment Method",
          input: "select",
          inputOptions: {
            promptpay: currentLanguage == "thai" ? "พร้อมเพย์" : "Promptpay",
            truemoneyVoucher: currentLanguage == "thai" ? "ลิ้งค์อั่งเปาทรูมันนี่" : "Truemoney Voucher"
          },
          confirmButtonText: currentLanguage == "thai" ? "ยืนยัน" : "Confirm",
          cancelButtonText: currentLanguage == "thai" ? "ยกเลิก" : "Cancel",
          confirmButtonColor: "rgb(59 130 246)",
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            switch (result.value) {
              case "promptpay": {
                const payload = promptpay.generate({
                  method: "QR_STATIC",
                  application: "PROMPTPAY_CREDIT_TRANSFER",
                  countryCode: "TH",
                  currencyCode: "764",
                  nationalID: "1559600059024",
                  amount: price.toString()
                });

                const qrCodeHtml = ReactDOMServer.renderToString(
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <QRCodeSVG value={payload} size={256} bgColor='#fff' fgColor='#000' level="Q" includeMargin={true} />
                  </div>
                );

                Swal.fire({
                  html: qrCodeHtml,
                  input: "file",
                  inputAttributes: {
                    "accept": "image/png, image/jpeg, image/jpg, image/gif"
                  },
                  title: currentLanguage == "thai" ? "พร้อมเพย์" : "Promptpay",
                  inputLabel: currentLanguage == "thai" ? `ชื่อบัญชี: ด.ช. ธนวัฒน์ วังแสง\nจำนวน: ${price} บาท` : `Name: Mr. Thanawat Wangsaeng\nAmount: ${price} baht`,
                  confirmButtonText: currentLanguage == "thai" ? "ยืนยัน" : "Confirm",
                  cancelButtonText: currentLanguage == "thai" ? "ยกเลิก" : "Cancel",
                  confirmButtonColor: "rgb(59 130 246)",
                  showCancelButton: true,
                }).then((value) => {
                  if (value.isConfirmed) {
                    if (value.value) {
                      const image = value.value as File;

                      if (image.size >= 2 * 1024 * 1024) return Swal.fire({
                        icon: "error",
                        title: currentLanguage == "thai" ? "รูปภาพต้องมีขนาดไม่เกิน 2 MB" : "Image must be no larger than 2 MB"
                      });

                      try {
                        const form = new FormData();

                        form.append("method", "promptpay");
                        form.append("slip_file", image);
                        form.append("userId", account.id);

                        fetch(`https://hstudio-api.hewkawar.xyz/store/${itemId}/buy`, {
                          method: "POST",
                          body: form
                        }).then((val) => val.json()).then((data) => {
                          if (data.success) {
                            Swal.fire({
                              icon: "success",
                              title: currentLanguage == "thai" ? "สั่งซื้อสำเร็จ" : "Order completed"
                            });
                            router.refresh();
                          } else {
                            Swal.fire({
                              icon: "error",
                              title: currentLanguage == "thai" ? "สั่งซื้อล้มเหลว" : "Order failed",
                              text: data.description
                            });
                          }
                        });
                      } catch (err) {
                        Swal.fire({
                          icon: "error",
                          title: currentLanguage == "thai" ? "สั่งซื้อล้มเหลว" : "Order failed",
                        });
                      }

                    } else {
                      Swal.fire({
                        icon: "error",
                        title: currentLanguage == "thai" ? "ไม่พบสลิป" : "Slip not found",
                      });
                    }
                  }
                });
                break;
              }
              case "truemoneyVoucher": {
                Swal.fire({
                  input: "url",
                  title: currentLanguage == "thai" ? "ลิ้งค์อั่งเปาทรูมันนี่" : "Truemoney Voucher",
                  text: currentLanguage == "thai" ? `ลิ้งค์อั่งเปามูลค่า ${price} บาท` : `Voucher url value ${price} baht`,
                  confirmButtonText: currentLanguage == "thai" ? "ยืนยัน" : "Confirm",
                  cancelButtonText: currentLanguage == "thai" ? "ยกเลิก" : "Cancel",
                  confirmButtonColor: "rgb(59 130 246)",
                  showCancelButton: true,
                }).then((value) => {
                  if (value.isConfirmed) {
                    const url = value.value as string;

                    if (!url) return Swal.fire({
                      icon: "error",
                      title: currentLanguage == "thai" ? "ไม่พบลิ้งค์" : "Invalid url"
                    });

                    if (url) {
                      try {
                        const form = new FormData();

                        form.append("method", "truemoney_voucher");
                        form.append("voucher_url", url);
                        form.append("userId", account.id);

                        fetch(`https://hstudio-api.hewkawar.xyz/store/${itemId}/buy`, {
                          method: "POST",
                          body: form
                        }).then((val) => val.json()).then((data) => {
                          if (data.success) {
                            Swal.fire({
                              icon: "success",
                              title: currentLanguage == "thai" ? "สั่งซื้อสำเร็จ" : "Order completed"
                            });
                            router.refresh();
                          } else {
                            Swal.fire({
                              icon: "error",
                              title: currentLanguage == "thai" ? "สั่งซื้อล้มเหลว" : "Order failed",
                              text: data.description
                            });
                          }
                        });
                      } catch (err) {
                        Swal.fire({
                          icon: "error",
                          title: currentLanguage == "thai" ? "สั่งซื้อล้มเหลว" : "Order failed",
                        });
                      }
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: currentLanguage == "thai" ? "ไม่พบลิ้งค์" : "Url not found",
                      });
                    }
                  }
                });
              }
            }
          }
        });
      }
    });
  }

  return (
    <>
      {
        currentLanguage == "thai" ? (<title>ร้านค้า | HStudio</title>) : (<title>Store | HStudio</title>)
      }

      <div className='mt-10 flex flex-wrap justify-center'>
        {
          itemList.length == 0 ? (<></>) : (<>
            {
              itemList.map((value: any, index) => (
                <div className="card bg-[#414141] p-4 rounded text-center m-3" key={index}>
                  <img src={value.image.url} className="w-96 rounded" alt={value.image.alt} />
                  <div className="text-left mt-2">
                    <h3 className="text-2xl">{value.title[currentLanguage || "english"]}</h3>
                    <p>{value.amount} {value.currency}</p>
                    <p>{value.description[currentLanguage || "english"]}</p>
                  </div>
                  <button onClick={() => buy(value.id, value.amount, value.title[currentLanguage || "english"])} className="bg-blue-500/40 p-3 w-full mt-3 rounded hover:bg-blue-500/80 transition-colors duration-150">{value.owned ? currentLanguage == "thai" ? "เป็นเจ้าของแล้ว" : "Owned" : currentLanguage == "thai" ? "ซื้อตอนนี้" : "Buy now"}</button>
                </div>
              ))
            }
          </>)
        }
      </div>
    </>
  )
}
