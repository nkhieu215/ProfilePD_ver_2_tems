package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ThongSoMayTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ThongSoMay.class);
        ThongSoMay thongSoMay1 = new ThongSoMay();
        thongSoMay1.setId(1L);
        ThongSoMay thongSoMay2 = new ThongSoMay();
        thongSoMay2.setId(thongSoMay1.getId());
        assertThat(thongSoMay1).isEqualTo(thongSoMay2);
        thongSoMay2.setId(2L);
        assertThat(thongSoMay1).isNotEqualTo(thongSoMay2);
        thongSoMay1.setId(null);
        assertThat(thongSoMay1).isNotEqualTo(thongSoMay2);
    }
}
