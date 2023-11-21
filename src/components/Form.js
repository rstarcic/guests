import React, { useState } from "react";
import citiesOfCroatia from "../citiesOfCroatia.json";
import translations from "../translations";

function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [birthCountry, setBirthCountry] = useState("");
  const [countryResidence, setCountryResidence] = useState("");
  const [residencePlace, setResidencePlace] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [acceptGDPR, setAcceptGDPR] = useState(false);
  const [showCities, setShowCities] = useState(false);
  const [language, setLanguage] = useState("en");
  //const [person, setPerson] = useState([])
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleDateInput = (input) => {
    if (input.length === 2 || input.length === 5) {
      return input + ".";
    }
    return input;
  };

  const currentYear = new Date().getFullYear();
  const isValidDate = (day, month, year) => {
    return day <= 31 && month <= 12 && year <= currentYear;
  };

  const handleDateOfBirthChange = (event) => {
    const { value } = event.target;
    const onlyNums = value.replace(/[^0-9]/g, "");

    if (onlyNums.length <= 8) {
      let day = onlyNums.slice(0, 2);
      let month = onlyNums.slice(2, 4);
      let year = onlyNums.slice(4);
      if (isValidDate(day, month, year)) {
        let formattedInput =
          handleDateInput(day) + handleDateInput(month) + year;
        setDateOfBirth(formattedInput);
      }
    }
  };

  const handleCitizenshipChange = (event) => {
    const value = event.target.value;
    setCitizenship(value);
    if (value === "Croatia") {
      setBirthCountry("Croatia");
      setCountryResidence("Croatia");
      setShowCities(true);
    } else {
      setBirthCountry(value);
      setCountryResidence(value);
      setShowCities(false);
    }
  };

  const handleBirthCountryChange = (event) => {
    setBirthCountry(event.target.value);
  };

  const handleCountryResidenceChange = (event) => {
    setCountryResidence(event.target.value);
    setShowCities(event.target.value === "Croatia");
  };

  const handleResidencePlaceChange = (event) => {
    setResidencePlace(event.target.value);
  };

  const handleDocumentTypeChange = (event) => {
    setDocumentType(event.target.value);
  };

  const handleDocumentNumberChange = (event) => {
    setDocumentNumber(event.target.value);
  };

  const handleGDPRCheckbox = (event) => {
    setAcceptGDPR(event.target.checked);
  };

  const [triedToSubmit, setTriedToSubmit] = useState(false);
  const validateForm = () => {
    if (
      !firstName ||
      !lastName ||
      !gender ||
      !dateOfBirth ||
      !citizenship ||
      !birthCountry ||
      !countryResidence ||
      !residencePlace ||
      !documentType ||
      !documentNumber
    ) {
      alert("Please, enter all required information.");
      setTriedToSubmit(true);
      return false;
    }

    const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!datePattern.test(dateOfBirth)) {
      alert("Please enter a valid date in the format dd.MM.yyyy");
      return false;
    }

    if (!acceptGDPR) {
      alert("Please accept the GDPR and privacy policy");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit called");
    if (validateForm()) {
      console.log("Form submitted");
      setTriedToSubmit(true);
      return false;
    }
  };

  const getValidationStyle = (value) => {
    return {
      borderColor: triedToSubmit && !value ? "red" : "initial",
    };
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };
  return (
    <div className="container body-container">
      <div className="select-language">
        <img src='/images/german.png' alt='german' className="german-img" onClick={() => changeLanguage('de')}></img>
        <img src='/images/italian.png' alt='italian' className="italian-img" onClick={() => changeLanguage('it')}></img>
        <img src='/images/english.png' alt='english' className="english-img" onClick={() => changeLanguage('en')}></img>
      </div>
      <div className="form-container">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="form-fields">
            <div id="first-person">
              <div className="form-field">
                <label
                  htmlFor="firstName"
                  style={{ fontSize: "23px", marginBottom: "5px" }}
                >
                  <u>{translations[language].firstPerson}</u>
                </label>
              </div>
              <div className="form-field">
                <label htmlFor="firstName">{translations[language].firstName}</label>
                <br />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  maxLength={100}
                  value={firstName}
                  onChange={handleFirstNameChange}
                  style={getValidationStyle(firstName)}
                />
                <br />
              </div>
              <div className="form-field">
                <label htmlFor="lastName">{translations[language].lastName}</label>
                <br />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  maxLength={100}
                  value={lastName}
                  onChange={handleLastNameChange}
                  style={getValidationStyle(lastName)}
                />
                <br />
              </div>
              <div className="form-field">
                <label htmlFor="gender">{translations[language].gender}</label>
                <br />
                <select
                  name="gender"
                  id="gender"
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <br />
              </div>
              <div className="form-field">
                <label htmlFor="dateOfBirth">
                {translations[language].dateOfBirth}{" "}
                </label>
                <br />
                <input
                  type="text"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  placeholder="dd.MM.yyyy"
                  value={dateOfBirth}
                  onChange={handleDateOfBirthChange}
                  maxLength={10}
                />
                <br />
              </div>
              <div className="form-field">
                <label htmlFor="citizenship">
                  {" "}
                  {translations[language].citizenship}{" "}
                </label>
                <br />
                <input
                  type="text"
                  id="citizenship"
                  name="citizenship"
                  list="countries"
                  value={citizenship}
                  onChange={handleCitizenshipChange}
                />
                <br />
                <datalist id="countries">
                  <option value="Afghanistan">AFG</option>
                  <option value="Aland Islands">ALA</option>
                  <option value="Albania">ALB</option>
                  <option value="Algeria">DZA</option>
                  <option value="American Samoa">ASM</option>
                  <option value="Andorra">AND</option>
                  <option value="Angola">AGO</option>
                  <option value="Anguilla">AIA</option>
                  <option value="Antarctica">ATA</option>
                  <option value="Antigua and Barbuda">ATG</option>
                  <option value="Argentina">ARG</option>
                  <option value="Armenia">ARM</option>
                  <option value="Aruba">ABW</option>
                  <option value="Australia">AUS</option>
                  <option value="Austria">AUT</option>
                  <option value="Azerbaijan">AZE</option>
                  <option value="Bahamas">BHS</option>
                  <option value="Bahrain">BHR</option>
                  <option value="Bangladesh">BGD</option>
                  <option value="Barbados">BRB</option>
                  <option value="Belarus">BLR</option>
                  <option value="Belgium">BEL</option>
                  <option value="Belize">BLZ</option>
                  <option value="Benin">BEN</option>
                  <option value="Bermuda">BMU</option>
                  <option value="Bhutan">BTN</option>
                  <option value="Bolivia">BOL</option>
                  <option value="Bonaire, Sint Eustatius and Saba">BES</option>
                  <option value="Bosnia and Herzegovina">BIH</option>
                  <option value="Botswana">BWA</option>
                  <option value="Bouvet Island">BVT</option>
                  <option value="Brazil">BRA</option>
                  <option value="British Indian Ocean Territory">IOT</option>
                  <option value="Brunei Darussalam">BRN</option>
                  <option value="Bulgaria">BGR</option>
                  <option value="Burkina Faso">BFA</option>
                  <option value="Burundi">BDI</option>
                  <option value="Cambodia">KHM</option>
                  <option value="Cameroon">CMR</option>
                  <option value="Canada">CAN</option>
                  <option value="Cape Verde">CPV</option>
                  <option value="Cayman Islands">CYM</option>
                  <option value="Central African Republic">CAF</option>
                  <option value="Chad">TCD</option>
                  <option value="Chile">CHL</option>
                  <option value="China">CHN</option>
                  <option value="Christmas Island">CXR</option>
                  <option value="Cocos (Keeling) Islands">CCK</option>
                  <option value="Colombia">COL</option>
                  <option value="Comoros">COM</option>
                  <option value="Congo">COG</option>
                  <option value="Congo, Democratic Republic of the Congo">
                    COD
                  </option>
                  <option value="Cook Islands">COK</option>
                  <option value="Costa Rica">CRI</option>
                  <option value="Cote D'Ivoire">CIV</option>
                  <option value="Croatia">HRV</option>
                  <option value="Cuba">CUB</option>
                  <option value="Curacao">CUW</option>
                  <option value="Cyprus">CYP</option>
                  <option value="Czech Republic">CZE</option>
                  <option value="Denmark">DNK</option>
                  <option value="Djibouti">DJI</option>
                  <option value="Dominica">DMA</option>
                  <option value="Dominican Republic">DOM</option>
                  <option value="Ecuador">ECU</option>
                  <option value="Egypt">EGY</option>
                  <option value="El Salvador">SLV</option>
                  <option value="Equatorial Guinea">GNQ</option>
                  <option value="Eritrea">ERI</option>
                  <option value="Estonia">EST</option>
                  <option value="Ethiopia">ETH</option>
                  <option value="Falkland Islands (Malvinas)">FLK</option>
                  <option value="Faroe Islands">FRO</option>
                  <option value="Fiji">FJI</option>
                  <option value="Finland">FIN</option>
                  <option value="France">FRA</option>
                  <option value="French Guiana">GUF</option>
                  <option value="French Polynesia">PYF</option>
                  <option value="French Southern Territories">ATF</option>
                  <option value="Gabon">GAB</option>
                  <option value="Gambia">GMB</option>
                  <option value="Georgia">GEO</option>
                  <option value="Germany">DEU</option>
                  <option value="Ghana">GHA</option>
                  <option value="Gibraltar">GIB</option>
                  <option value="Greece">GRC</option>
                  <option value="Greenland">GRL</option>
                  <option value="Grenada">GRD</option>
                  <option value="Guadeloupe">GLP</option>
                  <option value="Guam">GUM</option>
                  <option value="Guatemala">GTM</option>
                  <option value="Guernsey">GGY</option>
                  <option value="Guinea">GIN</option>
                  <option value="Guinea-Bissau">GNB</option>
                  <option value="Guyana">GUY</option>
                  <option value="Haiti">HTI</option>
                  <option value="Heard Island and Mcdonald Islands">HMD</option>
                  <option value="Holy See (Vatican City State)">VAT</option>
                  <option value="Honduras">HND</option>
                  <option value="Hong Kong">HKG</option>
                  <option value="Hungary">HUN</option>
                  <option value="Iceland">ISL</option>
                  <option value="India">IND</option>
                  <option value="Indonesia">IDN</option>
                  <option value="Iran, Islamic Republic of">IRN</option>
                  <option value="Iraq">IRQ</option>
                  <option value="Ireland">IRL</option>
                  <option value="Isle of Man">IMN</option>
                  <option value="Israel">ISR</option>
                  <option value="Italy">ITA</option>
                  <option value="Jamaica">JAM</option>
                  <option value="Japan">JPN</option>
                  <option value="Jersey">JEY</option>
                  <option value="Jordan">JOR</option>
                  <option value="Kazakhstan">KAZ</option>
                  <option value="Kenya">KEN</option>
                  <option value="Kiribati">KIR</option>
                  <option value="Korea, Democratic People's Republic of">
                    PRK
                  </option>
                  <option value="Korea, Republic of">KOR</option>
                  <option value="Kosovo">XKX</option>
                  <option value="Kuwait">KWT</option>
                  <option value="Kyrgyzstan">KGZ</option>
                  <option value="Lao People's Democratic Republic">LAO</option>
                  <option value="Latvia">LVA</option>
                  <option value="Lebanon">LBN</option>
                  <option value="Lesotho">LSO</option>
                  <option value="Liberia">LBR</option>
                  <option value="Libyan Arab Jamahiriya">LBY</option>
                  <option value="Liechtenstein">LIE</option>
                  <option value="Lithuania">LTU</option>
                  <option value="Luxembourg">LUX</option>
                  <option value="Macao">MAC</option>
                  <option value="Macedonia, the Former Yugoslav Republic of">
                    MKD
                  </option>
                  <option value="Madagascar">MDG</option>
                  <option value="Malawi">MWI</option>
                  <option value="Malaysia">MYS</option>
                  <option value="Maldives">MDV</option>
                  <option value="Mali">MLI</option>
                  <option value="Malta">MLT</option>
                  <option value="Marshall Islands">MHL</option>
                  <option value="Martinique">MTQ</option>
                  <option value="Mauritania">MRT</option>
                  <option value="Mauritius">MUS</option>
                  <option value="Mayotte">MYT</option>
                  <option value="Mexico">MEX</option>
                  <option value="Micronesia, Federated States of">FSM</option>
                  <option value="Moldova, Republic of">MDA</option>
                  <option value="Monaco">MCO</option>
                  <option value="Mongolia">MNG</option>
                  <option value="Montenegro">MNE</option>
                  <option value="Montserrat">MSR</option>
                  <option value="Morocco">MAR</option>
                  <option value="Mozambique">MOZ</option>
                  <option value="Myanmar">MMR</option>
                  <option value="Namibia">NAM</option>
                  <option value="Nauru">NRU</option>
                  <option value="Nepal">NPL</option>
                  <option value="Netherlands">NLD</option>
                  <option value="Netherlands Antilles">ANT</option>
                  <option value="New Caledonia">NCL</option>
                  <option value="New Zealand">NZL</option>
                  <option value="Nicaragua">NIC</option>
                  <option value="Niger">NER</option>
                  <option value="Nigeria">NGA</option>
                  <option value="Niue">NIU</option>
                  <option value="Norfolk Island">NFK</option>
                  <option value="Northern Mariana Islands">MNP</option>
                  <option value="Norway">NOR</option>
                  <option value="Oman">OMN</option>
                  <option value="Pakistan">PAK</option>
                  <option value="Palau">PLW</option>
                  <option value="Palestinian Territory, Occupied">PSE</option>
                  <option value="Panama">PAN</option>
                  <option value="Papua New Guinea">PNG</option>
                  <option value="Paraguay">PRY</option>
                  <option value="Peru">PER</option>
                  <option value="Philippines">PHL</option>
                  <option value="Pitcairn">PCN</option>
                  <option value="Poland">POL</option>
                  <option value="Portugal">PRT</option>
                  <option value="Puerto Rico">PRI</option>
                  <option value="Qatar">QAT</option>
                  <option value="Reunion">REU</option>
                  <option value="Romania">ROU</option>
                  <option value="Russian Federation">RUS</option>
                  <option value="Rwanda">RWA</option>
                  <option value="Saint Barthelemy">BLM</option>
                  <option value="Saint Helena">SHN</option>
                  <option value="Saint Kitts and Nevis">KNA</option>
                  <option value="Saint Lucia">LCA</option>
                  <option value="Saint Martin">MAF</option>
                  <option value="Saint Pierre and Miquelon">SPM</option>
                  <option value="Saint Vincent and the Grenadines">VCT</option>
                  <option value="Samoa">WSM</option>
                  <option value="San Marino">SMR</option>
                  <option value="Sao Tome and Principe">STP</option>
                  <option value="Saudi Arabia">SAU</option>
                  <option value="Senegal">SEN</option>
                  <option value="Serbia">SRB</option>
                  <option value="Serbia and Montenegro">SCG</option>
                  <option value="Seychelles">SYC</option>
                  <option value="Sierra Leone">SLE</option>
                  <option value="Singapore">SGP</option>
                  <option value="Sint Maarten">SXM</option>
                  <option value="Slovakia">SVK</option>
                  <option value="Slovenia">SVN</option>
                  <option value="Solomon Islands">SLB</option>
                  <option value="Somalia">SOM</option>
                  <option value="South Africa">ZAF</option>
                  <option value="South Georgia and the South Sandwich Islands">
                    SGS
                  </option>
                  <option value="South Sudan">SSD</option>
                  <option value="Spain">ESP</option>
                  <option value="Sri Lanka">LKA</option>
                  <option value="Sudan">SDN</option>
                  <option value="Suriname">SUR</option>
                  <option value="Svalbard and Jan Mayen">SJM</option>
                  <option value="Swaziland">SWZ</option>
                  <option value="Sweden">SWE</option>
                  <option value="Switzerland">CHE</option>
                  <option value="Syrian Arab Republic">SYR</option>
                  <option value="Taiwan, Province of China">TWN</option>
                  <option value="Tajikistan">TJK</option>
                  <option value="Tanzania, United Republic of">TZA</option>
                  <option value="Thailand">THA</option>
                  <option value="Timor-Leste">TLS</option>
                  <option value="Togo">TGO</option>
                  <option value="Tokelau">TKL</option>
                  <option value="Tonga">TON</option>
                  <option value="Trinidad and Tobago">TTO</option>
                  <option value="Tunisia">TUN</option>
                  <option value="Turkey">TUR</option>
                  <option value="Turkmenistan">TKM</option>
                  <option value="Turks and Caicos Islands">TCA</option>
                  <option value="Tuvalu">TUV</option>
                  <option value="Uganda">UGA</option>
                  <option value="Ukraine">UKR</option>
                  <option value="United Arab Emirates">ARE</option>
                  <option value="United Kingdom">GBR</option>
                  <option value="United States">USA</option>
                  <option value="United States Minor Outlying Islands">
                    UMI
                  </option>
                  <option value="Uruguay">URY</option>
                  <option value="Uzbekistan">UZB</option>
                  <option value="Vanuatu">VUT</option>
                  <option value="Venezuela">VEN</option>
                  <option value="Viet Nam">VNM</option>
                  <option value="Virgin Islands, British">VGB</option>
                  <option value="Virgin Islands, U.s.">VIR</option>
                  <option value="Wallis and Futuna">WLF</option>
                  <option value="Western Sahara">ESH</option>
                  <option value="Yemen">YEM</option>
                  <option value="Zambia">ZMB</option>
                  <option value="Zimbabwe">ZWE</option>
                </datalist>
              </div>
              <div className="form-field">
                <label htmlFor="birthCountry">
                {translations[language].birthCountry}
                </label>
                <br />
                <input
                  name="birthCountry"
                  type="text"
                  id="birthCountry"
                  list="countries"
                  value={birthCountry}
                  onChange={handleBirthCountryChange}
                />
                <br />
              </div>
              <div className="form-field">
                <label htmlFor="countryResidence">
                {translations[language].countryResidence}
                </label>
                <br />
                <input
                  name="countryResidence"
                  type="text"
                  id="countryResidence"
                  list="countries"
                  value={countryResidence}
                  onChange={handleCountryResidenceChange}
                />
                <br />
              </div>
              <div className="form-field">
                <label htmlFor="residencePlace">
                {translations[language].residencePlace}
                </label>
                <br />
                <input
                  name="residencePlace"
                  type="text"
                  id="residencePlace"
                  maxLength={50}
                  value={residencePlace}
                  onChange={handleResidencePlaceChange}
                  list={showCities ? "cities" : ""}
                />
                <datalist id="cities">
                  {citiesOfCroatia.map((city, index) => (
                    <option key={index} value={city.city} />
                  ))}
                </datalist>
              </div>
              <div className="form-field">
                <label>{translations[language].documentType}</label>
                <br />
                <select
                  name="documentType"
                  id="documentType"
                  value={documentType}
                  onChange={handleDocumentTypeChange}
                >
                  <option value="ID">ID</option>
                  <option value="Passport">Passport</option>
                  <option value="DrivingLicense">Driving license</option>
                  <option value="HealthCard">Health Insurance Card</option>
                </select>
                <br />
              </div>
              <div className="form-field">
                <label htmlFor="documentNumber">
                {translations[language].documentNumber}
                </label>
                <br />
                <input
                  name="documentNumber"
                  type="text"
                  id="documentNumber"
                  maxLength={16}
                  value={documentNumber}
                  onChange={handleDocumentNumberChange}
                  style={getValidationStyle(documentNumber)}
                />
                <br />
              </div>
              <p className="addNext">
                <button id="addNextPersonButton" className="add-person-btn">
                {translations[language].addNextPersonButton}
                </button>
              </p>
            </div>
            <div id="second-person"></div>
            <div id="third-person"></div>
            <div id="fourth-person"></div>
            <div id="fifth-person"></div>
          </div>
          <div
            className="checkbox-class checkbox-div"
            style={{ marginBottom: "60px" }}
          >
            <label htmlFor="checkbox-check">
              <input
                type="checkbox"
                name="checkForm"
                id="checkbox-check"
                value={acceptGDPR}
                onChange={handleGDPRCheckbox}
              />
              <span className="textAccept">
                {" "}
                {translations[language].textAccept}{" "}
                <a
                  href= {translations[language].gdprLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translations[language].gdprText} {" "}
                </a>
                and{" "}
                <a
                  href= {translations[language].privacyPolicyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                   {translations[language].privacyPolicyText}
                </a>
              </span>
            </label>
          </div>
          <p className="check-in-btn">
            <button id="submit" className="submit-btn" type="submit">
              CHECK-IN
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Form;
