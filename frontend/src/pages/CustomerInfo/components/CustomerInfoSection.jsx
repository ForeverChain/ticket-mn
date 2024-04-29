import { useEffect, useState } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { useSelector } from "react-redux";

export const CustomerInfoSection = () => {
  const [cusProData, setCusProData] = useState({});
  const [cusTicketData, setCusTicketData] = useState([]);
  const override = {
    display: "block",
    margin: "2.4rem auto",
  };

  const { signedPerson } = useSelector((store) => store.authentication);

  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/customerProfile`,
          {
            email: signedPerson.email,
            password: signedPerson.password,
          }
        );
        setCusProData(response.data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading1(false);
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/customerPurchases`,
          {
            email: signedPerson.email,
          }
        );
        const formattedData = response.data.map((dataObj) => {
          const purDate = new Date(dataObj.purchase_date).toLocaleDateString(
            "en-GB"
          );
          const showDate = new Date(dataObj.showtime_date).toLocaleDateString(
            "en-GB"
          );
          return {
            ...dataObj,
            showtime_date: showDate,
            purchase_date: purDate,
          };
        });
        setCusTicketData(formattedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading2(false);
      }
    };

    fetchData();
  }, [signedPerson]);

  const purchaseHtml = cusTicketData.map((cusTicket, id) => {
    return (
      <li key={id} className="purchase-history-item">
        <div className="purchase-item-categories">
          <div className="purchase-item-category">
            <p>Movie:</p>
            <p>{cusTicket.movie_name}</p>
          </div>

          <div className="purchase-item-category">
            <p>Тасалбарын ID:</p>
            <p>{cusTicket.ticket_ids}</p>
          </div>

          <div className="purchase-item-category">
            <p>Үзвэрийн төрөл:</p>
            <p>{cusTicket.show_type}</p>
          </div>

          <div className="purchase-item-category">
            <p>Кино театр:</p>
            <p>{cusTicket.theatre_name}</p>
          </div>

          <div className="purchase-item-category">
            <p>Танхим:</p>
            <p>{cusTicket.hall_name}</p>
          </div>

          <div className="purchase-item-category">
            <p>Суудал:</p>
            <p>{cusTicket.seat_numbers}</p>
          </div>

          <div className="purchase-item-category">
            <p>Гарах өдөр:</p>
            <p>{cusTicket.showtime_date}</p>
          </div>

          <div className="purchase-item-category">
            <p>Эхлэх цаг:</p>
            <p>{cusTicket.movie_start_time}</p>
          </div>

          <div className="purchase-item-category">
            <p>Үнэ:</p>
            <p>{cusTicket.ticket_price}₮</p>
          </div>

          <div className="purchase-item-category">
            <p>Худалдан авалт хийсэн өдөр:</p>
            <p>{cusTicket.purchase_date}</p>
          </div>
        </div>

        <div className="purchase-item-img-box">
          <img
            className="purchase-item-img"
            src={cusTicket.movie_image}
            alt="movie-photo"
          />
        </div>
      </li>
    );
  });

  return (
    <div className="section-customer-info">
      <div className="container">
        <h3 className="customer-info-heading">Хэрэглэгчийн мэдээлэл</h3>
        {loading1 ? (
          <HashLoader cssOverride={override} color="#eb3656" />
        ) : (
          <div className="customer-info-details">
            <div>
              <p>Нэр</p>
              <p>:</p>
              <p>
                {cusProData &&
                  `${cusProData.first_name} ${cusProData.last_name}`}
              </p>
            </div>

            <div>
              <p>Имэйл хаяг</p>
              <p>:</p>
              <p>{cusProData.email}</p>
            </div>

            <div>
              <p>Утасны дугаар</p>
              <p>:</p>
              <p>{cusProData.phone_number}</p>
            </div>
          </div>
        )}

        <h3 className="customer-info-heading">Худалдан авалтын түүх</h3>
        {loading2 ? (
          <HashLoader cssOverride={override} color="#eb3656" />
        ) : (
          <>
            {cusTicketData.length === 0 && (
              <p className="customer-empty-status">
                Та худалдан авалт хийгээгүй байна
              </p>
            )}
            <div className="purchase-history-section">
              <ul className="purchase-history-list">{purchaseHtml}</ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
