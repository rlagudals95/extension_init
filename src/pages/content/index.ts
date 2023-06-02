try {
  console.log(
    "  document.getElementsByTagName(BODY):",
    document.getElementsByTagName("BODY")
  );

  // 쿠팡 상품정보 더보기 버튼 클릭
  setTimeout(() => {
    const moreBtn = document.querySelector(
      ".product-detail-seemore-btn"
    ) as unknown as HTMLElement;

    if (moreBtn) {
      moreBtn.click();
    }
  }, 2000);
} catch (e) {
  console.error(e);
}
