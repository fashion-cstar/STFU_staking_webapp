import createSvg from "./createSvg";

export default createSvg((props) => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M47.554 27.4463C48.905 27.4463 50 26.3513 50 25.0002C50 23.6492 48.905 22.5542 47.554 22.5542H45.745C45.618 21.4577 45.4041 20.3777 45.1051 19.3192L46.773 18.6282C48.021 18.1117 48.6135 16.6807 48.097 15.4327C47.5795 14.1846 46.1495 13.5921 44.9011 14.1086L43.2316 14.8001C42.6946 13.8396 42.0821 12.9246 41.3986 12.0601L42.6776 10.7811C43.6326 9.8261 43.6326 8.27708 42.6776 7.32207C41.7226 6.36706 40.1736 6.36706 39.2186 7.32207L37.9396 8.60109C37.0751 7.91758 36.1601 7.30457 35.1996 6.76807L35.8911 5.09855C36.4076 3.85054 35.8151 2.41952 34.5671 1.90302C33.3192 1.38551 31.8882 1.97802 31.3717 3.22653L30.6807 4.89455C29.6222 4.59555 28.5422 4.38204 27.4457 4.25504V2.44602C27.4457 1.09451 26.3512 0 24.9997 0C23.6483 0 22.5538 1.09451 22.5538 2.44602V4.25504C21.4573 4.38204 20.3783 4.59555 19.3198 4.89455L18.6288 3.22653C18.1113 1.97852 16.6808 1.38601 15.4333 1.90302C14.1854 2.41952 13.5924 3.85054 14.1094 5.09855L14.8004 6.76707C13.8404 7.30457 12.9254 7.91658 12.0609 8.60109L10.7819 7.32207C9.82591 6.36706 8.27791 6.36706 7.32292 7.32207C6.36793 8.27708 6.36793 9.8261 7.32292 10.7811L8.60191 12.0601C7.91742 12.9246 7.30544 13.8396 6.76795 14.8001L5.09846 14.1086C3.85097 13.5921 2.41998 14.1846 1.90298 15.4327C1.38649 16.6807 1.97898 18.1117 3.22697 18.6282L4.89497 19.3192C4.59597 20.3777 4.38196 21.4577 4.25496 22.5542H2.44597C1.09498 22.5542 0 23.6492 0 25.0002C0 26.3513 1.09498 27.4463 2.44597 27.4463H4.25496C4.38196 28.5428 4.59546 29.6228 4.89446 30.6803L3.22697 31.3713C1.97898 31.8888 1.38649 33.3193 1.90298 34.5673C2.29298 35.5089 3.20397 36.0779 4.16346 36.0779C4.47546 36.0779 4.79246 36.0179 5.09846 35.8909L6.76795 35.1994C7.30494 36.1599 7.91742 37.0754 8.60191 37.9399L7.32292 39.2189C6.36793 40.1739 6.36793 41.7224 7.32292 42.6779C7.80042 43.1554 8.42593 43.3939 9.05242 43.3939C9.67892 43.3939 10.3039 43.1554 10.7824 42.6779L12.0614 41.3989C12.9259 42.0834 13.8409 42.6954 14.8014 43.2319L14.1099 44.9014C13.5924 46.1495 14.1859 47.5805 15.4339 48.097C15.7393 48.224 16.0569 48.284 16.3689 48.284C17.3283 48.284 18.2393 47.7155 18.6293 46.773L19.3203 45.1054C20.3788 45.4045 21.4583 45.618 22.5543 45.745V47.554C22.5543 48.905 23.6493 50 25.0003 50C26.3512 50 27.4462 48.905 27.4462 47.554V45.745C28.5427 45.618 29.6227 45.4045 30.6812 45.1054L31.3722 46.773C31.7622 47.7155 32.6727 48.284 33.6327 48.284C33.9447 48.284 34.2617 48.224 34.5677 48.097C35.8156 47.5805 36.4081 46.1495 35.8916 44.9014L35.2002 43.2319C36.1606 42.6944 37.0756 42.0824 37.9401 41.3989L39.2191 42.6779C39.6966 43.1554 40.3226 43.3939 40.9491 43.3939C41.5756 43.3939 42.2006 43.1554 42.6786 42.6779C43.6336 41.7219 43.6336 40.1739 42.6786 39.2189L41.3996 37.9399C42.0831 37.0754 42.6961 36.1604 43.2336 35.1999L44.9021 35.8909C45.2086 36.0179 45.525 36.0779 45.8375 36.0779C46.797 36.0779 47.708 35.5094 48.098 34.5673C48.6145 33.3193 48.022 31.8883 46.774 31.3713L45.1065 30.6803C45.405 29.6223 45.619 28.5423 45.746 27.4463H47.555H47.554ZM9.62341 34.0168C8.80142 32.6208 8.16441 31.1043 7.74592 29.4998C7.57042 28.8303 7.43392 28.1448 7.33742 27.4463C7.22743 26.6463 7.17043 25.8303 7.17043 25.0002C7.17043 24.1702 7.22743 23.3542 7.33742 22.5542C7.43392 21.8557 7.57042 21.1702 7.74592 20.5007C8.16441 18.8962 8.80142 17.3792 9.62341 15.9832C9.97791 15.3807 10.3669 14.8011 10.7879 14.2466C11.7774 12.9416 12.9424 11.7766 14.2469 10.7876C14.8013 10.3671 15.3813 9.9781 15.9833 9.6231C17.3793 8.80209 18.8963 8.16458 20.5008 7.74658C21.1703 7.57108 21.8558 7.43457 22.5538 7.33807V23.9877L22.1148 24.4262L21.5413 25.0002L20.6823 25.8588L19.0953 27.4463L14.5764 31.9653L10.7874 35.7544C10.3669 35.1999 9.9779 34.6198 9.6229 34.0173L9.62341 34.0168ZM39.2121 35.7539C38.2226 37.0589 37.0576 38.2239 35.7531 39.2129C35.1987 39.6329 34.6187 40.0224 34.0167 40.3764C32.6207 41.1984 31.1037 41.8354 29.4997 42.2539C28.8297 42.4294 28.1442 42.5659 27.4457 42.6624C26.6457 42.7724 25.8297 42.8294 24.9997 42.8294C24.1698 42.8294 23.3538 42.7724 22.5538 42.6624C21.8553 42.5659 21.1698 42.4294 20.5003 42.2539C18.8958 41.8354 17.3793 41.1984 15.9833 40.3764C15.3808 40.0224 14.8013 39.6334 14.2469 39.2129L18.0343 35.4254L22.5538 30.9058L24.1413 29.3183L25.0003 28.4593L25.5737 27.8853L26.3232 28.1958L27.4452 28.6603L29.5187 29.5193L35.4236 31.9648L40.3761 34.0163C40.0216 34.6193 39.6326 35.1989 39.2116 35.7534L39.2121 35.7539ZM42.2536 29.4993L37.2971 27.4458L31.3917 24.9997L29.3182 24.1407L28.1962 23.6762L27.4457 23.3657V7.33807C28.1442 7.43457 28.8287 7.57108 29.4992 7.74658C31.1037 8.16508 32.6207 8.80209 34.0167 9.6241C34.6192 9.9781 35.1987 10.3676 35.7531 10.7876C37.0581 11.7771 38.2231 12.9421 39.2121 14.2466C39.6326 14.8011 40.0216 15.3812 40.3766 15.9832C41.1986 17.3792 41.8356 18.8962 42.2541 20.5007C42.4296 21.1702 42.5661 21.8557 42.6626 22.5542C42.7726 23.3542 42.8296 24.1702 42.8296 25.0002C42.8296 25.8303 42.7726 26.6463 42.6626 27.4463C42.5661 28.1448 42.4296 28.8303 42.2541 29.4998L42.2536 29.4993Z" fill="white" />
    <path d="M25.3125 40C33.4242 40 40 33.2843 40 25C40 16.7157 33.4242 10 25.3125 10C17.2008 10 10.625 16.7157 10.625 25C10.625 33.2843 17.2008 40 25.3125 40Z" fill="#6FFF39" />
    <path fillRule="evenodd" clipRule="evenodd" d="M25.3125 10.9149C17.378 10.9149 10.9457 17.221 10.9457 25C10.9457 32.779 17.378 39.0851 25.3125 39.0851C33.2471 39.0851 39.6793 32.779 39.6793 25C39.6793 17.221 33.2471 10.9149 25.3125 10.9149ZM9.375 25C9.375 16.3706 16.5105 9.375 25.3125 9.375C34.1145 9.375 41.25 16.3706 41.25 25C41.25 33.6295 34.1145 40.625 25.3125 40.625C16.5105 40.625 9.375 33.6295 9.375 25Z" fill="black" />
    <path fillRule="evenodd" clipRule="evenodd" d="M16.4871 18.3621C16.8031 18.046 17.3156 18.046 17.6316 18.3621L21.6379 22.3684C21.954 22.6844 21.954 23.1969 21.6379 23.5129C21.3219 23.829 20.8094 23.829 20.4934 23.5129L16.4871 19.5066C16.171 19.1906 16.171 18.6781 16.4871 18.3621Z" fill="black" />
    <path fillRule="evenodd" clipRule="evenodd" d="M21.6379 18.3621C21.954 18.6781 21.954 19.1906 21.6379 19.5066L17.6316 23.5129C17.3156 23.829 16.8031 23.829 16.4871 23.5129C16.171 23.1969 16.171 22.6844 16.4871 22.3684L20.4934 18.3621C20.8094 18.046 21.3219 18.046 21.6379 18.3621Z" fill="black" />
    <path fillRule="evenodd" clipRule="evenodd" d="M34.138 18.3621C34.454 18.6782 34.454 19.1906 34.1379 19.5067L30.1315 23.513C29.8154 23.829 29.303 23.829 28.987 23.5129C28.671 23.1968 28.671 22.6844 28.9871 22.3683L32.9935 18.362C33.3096 18.046 33.822 18.046 34.138 18.3621Z" fill="black" />
    <path fillRule="evenodd" clipRule="evenodd" d="M28.987 18.3621C29.303 18.046 29.8154 18.046 30.1315 18.362L34.1379 22.3683C34.454 22.6844 34.454 23.1968 34.138 23.5129C33.822 23.829 33.3096 23.829 32.9935 23.513L28.9871 19.5067C28.671 19.1906 28.671 18.6782 28.987 18.3621Z" fill="black" />
    <path fillRule="evenodd" clipRule="evenodd" d="M13.9296 27.1422C14.1986 26.8222 14.6719 26.7843 14.9868 27.0575C21.0098 32.2826 29.6152 32.2826 35.6382 27.0575C35.9531 26.7843 36.4265 26.8222 36.6954 27.1422C36.9643 27.4621 36.927 27.943 36.6121 28.2162C30.0282 33.9279 20.5968 33.9279 14.0129 28.2162C13.698 27.943 13.6607 27.4621 13.9296 27.1422Z" fill="black" />
    <path fillRule="evenodd" clipRule="evenodd" d="M15.9852 27.0098C16.2873 27.2238 16.3385 27.6166 16.0995 27.8871L14.9945 29.1379C14.7555 29.4084 14.3169 29.4542 14.0148 29.2402C13.7127 29.0262 13.6615 28.6334 13.9005 28.3629L15.0055 27.1121C15.2445 26.8416 15.6831 26.7958 15.9852 27.0098Z" fill="black" />
    <path fillRule="evenodd" clipRule="evenodd" d="M18.9092 28.8189C19.3141 28.9891 19.4881 29.4207 19.298 29.7829C19.0049 30.3412 18.7118 30.8996 18.4181 31.4585C18.2278 31.8207 17.7453 31.9762 17.3405 31.806C16.9357 31.6357 16.7618 31.204 16.9522 30.8419C17.2457 30.2832 17.5387 29.7251 17.8318 29.1667C18.022 28.8045 18.5043 28.6488 18.9092 28.8189Z" fill="black" />
    <path fillRule="evenodd" clipRule="evenodd" d="M21.9193 29.3942C22.3171 29.4921 22.5695 29.9364 22.483 30.3865C22.4163 30.7336 22.3496 31.0805 22.2829 31.4273C22.2162 31.7742 22.1495 32.121 22.0828 32.468C21.9963 32.9181 21.6036 33.2037 21.2057 33.1058C20.8079 33.0079 20.5555 32.5636 20.642 32.1135C20.7086 31.7668 20.7753 31.4203 20.8419 31.0738L20.8422 31.0723C20.9088 30.7256 20.9755 30.3789 21.0422 30.032C21.1287 29.5819 21.5214 29.2963 21.9193 29.3942Z" fill="black" />
    <path fillRule="evenodd" clipRule="evenodd" d="M25.6132 30C25.9547 29.9962 26.2339 30.3619 26.2367 30.8167L26.25 32.9195C26.2528 33.3743 25.9783 33.7462 25.6368 33.75C25.2953 33.7538 25.0161 33.3882 25.0133 32.9333L25 30.8305C24.9972 30.3757 25.2717 30.0038 25.6132 30Z" fill="black" />
    <path fillRule="evenodd" clipRule="evenodd" d="M28.684 29.3975C29.0738 29.2916 29.4641 29.5701 29.5559 30.0195C29.6267 30.3658 29.6975 30.712 29.7682 31.0583L29.7683 31.0588C29.839 31.4049 29.9098 31.751 29.9805 32.0973C30.0723 32.5466 29.8308 32.9967 29.441 33.1025C29.0512 33.2084 28.6609 32.9299 28.5691 32.4805C28.4983 32.1342 28.4275 31.788 28.3568 31.4417C28.286 31.0954 28.2152 30.7492 28.1445 30.4027C28.0527 29.9534 28.2942 29.5033 28.684 29.3975Z" fill="black" />
    <path fillRule="evenodd" clipRule="evenodd" d="M31.6971 28.2148C32.0935 28.002 32.5727 28.1804 32.7675 28.6134C32.9178 28.9473 33.0679 29.2813 33.2179 29.6151C33.3679 29.9489 33.5178 30.2825 33.6678 30.616C33.8626 31.0489 33.6992 31.5724 33.3029 31.7852C32.9065 31.998 32.4273 31.8196 32.2325 31.3866C32.0822 31.0527 31.9321 30.7187 31.7821 30.3849L31.7821 30.3849C31.6321 30.0511 31.4822 29.7175 31.3322 29.384C31.1374 28.9511 31.3008 28.4276 31.6971 28.2148Z" fill="black" />
    <path fillRule="evenodd" clipRule="evenodd" d="M34.6906 26.4285C35.0592 26.153 35.6031 26.2018 35.9056 26.5375C36.1388 26.7963 36.3718 27.055 36.6048 27.3137L36.6066 27.3156C36.839 27.5736 37.0715 27.8317 37.304 28.0898C37.6065 28.4255 37.5529 28.921 37.1844 29.1965C36.8158 29.472 36.2719 29.4232 35.9694 29.0875C35.7362 28.8287 35.5032 28.57 35.2702 28.3113C35.0371 28.0526 34.8041 27.794 34.571 27.5352C34.2685 27.1995 34.3221 26.704 34.6906 26.4285Z" fill="black" />
    <path d="M41.9627 30.5961L36.5911 28.5927C36.3229 28.4926 36.1827 28.1614 36.2819 27.8637C36.3574 27.6368 36.5533 27.4904 36.7681 27.5005L42.6482 27.7769C42.9781 27.7923 43.2033 28.1603 43.0995 28.5139L42.591 30.2409C42.5046 30.5343 42.2238 30.6935 41.9632 30.5966L41.9627 30.5961Z" fill="black" />
    <path d="M26.2495 29.2718V36.875H23.75V29.2718C23.75 28.6412 24.2169 28.125 24.7872 28.125H25.2127C25.7831 28.125 26.25 28.6412 26.25 29.2718H26.2495Z" fill="#6FFF39" />
    <path fillRule="evenodd" clipRule="evenodd" d="M25.0789 29.0794C24.9027 29.0794 24.7549 29.2226 24.7549 29.3934V35.9206H25.8695V29.3755C25.8597 29.2128 25.7161 29.0794 25.5461 29.0794H25.0789ZM27.4995 30.1831H27.5V29.3934C27.5 28.3503 26.6224 27.5 25.5461 27.5H25.0789C24.0025 27.5 23.125 28.3503 23.125 29.3934V37.5H27.4995V30.1831Z" fill="black" />
    <path d="M31.2156 38.1994L29.585 44.195C29.4564 44.6679 28.9963 45 28.4694 45H24.9008C24.8415 45 24.7828 44.9956 24.7252 44.9876C24.6878 44.9822 24.6504 44.9753 24.6141 44.9664C24.5405 44.9496 24.4695 44.9249 24.4023 44.8947C24.335 44.8646 24.272 44.829 24.2133 44.7885C24.1989 44.7786 24.1834 44.7682 24.169 44.7564C24.1412 44.7341 24.1135 44.7109 24.0873 44.6872C24.0729 44.6758 24.0607 44.6635 24.0489 44.6501C24.0249 44.6254 24.0019 44.5997 23.979 44.573C23.9454 44.5315 23.9149 44.488 23.8888 44.4426C23.8626 44.3971 23.8397 44.3501 23.8199 44.3012C23.7751 44.1876 23.75 44.0645 23.75 43.9355V36.875H30.099C30.8484 36.875 31.3976 37.5273 31.2146 38.1999L31.2156 38.1994Z" fill="#6FFF39" />
    <path fillRule="evenodd" clipRule="evenodd" d="M23.125 36.25H29.7137C30.4118 36.25 31 36.6302 31.3044 37.1728L31.875 36.8934L29.9747 44.2832C29.7719 45.0717 29.0471 45.625 28.2167 45.625H24.9383C24.8431 45.625 24.7519 45.6174 24.6661 45.605L24.6629 45.6045L24.6596 45.604C24.6068 45.5959 24.5486 45.5848 24.4878 45.5693C24.3652 45.5392 24.2524 45.4969 24.1508 45.4487C24.0461 45.3991 23.9478 45.3404 23.8564 45.2739C23.8563 45.2738 23.856 45.2736 23.8557 45.2734C23.8488 45.2685 23.8087 45.2399 23.7688 45.2057C23.7402 45.1814 23.7085 45.1536 23.6761 45.1231C23.6377 45.0888 23.6069 45.0559 23.583 45.0282C23.5515 44.9934 23.5237 44.9602 23.5 44.931L23.4932 44.9226L23.4866 44.914C23.435 44.8467 23.3855 44.7724 23.3412 44.691C23.3019 44.6186 23.267 44.5434 23.2371 44.4649L23.2361 44.4623L23.2351 44.4597C23.1646 44.2707 23.125 44.0653 23.125 43.8504V36.25ZM29.6039 39.661L29.6026 39.6616L30.0053 38.0968C30.0531 37.9112 29.9099 37.7308 29.7137 37.7308H24.6372V43.8504C24.6372 43.8851 24.6433 43.918 24.6546 43.9492C24.6607 43.9648 24.6677 43.9799 24.6759 43.9949C24.679 44.0006 24.6839 44.0085 24.6911 44.0185C24.7026 44.0324 24.711 44.042 24.7177 44.0494L24.7184 44.0501L24.7201 44.0518C24.7285 44.0598 24.7394 44.0697 24.7533 44.0817L24.7577 44.0848L24.7586 44.0855C24.7747 44.0972 24.7916 44.1073 24.8098 44.1159C24.83 44.1255 24.8455 44.1306 24.8558 44.1331L24.8621 44.1346L24.8684 44.1362C24.8717 44.137 24.879 44.1387 24.891 44.1407C24.9097 44.1432 24.9254 44.1442 24.9383 44.1442H28.2167C28.3541 44.1442 28.4747 44.0522 28.5083 43.9216C28.5083 43.9216 28.5083 43.9216 28.5083 43.9216L29.6039 39.661Z" fill="black" />
  </svg>

));
