package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ChiTietLichSuUpdateTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChiTietLichSuUpdate.class);
        ChiTietLichSuUpdate chiTietLichSuUpdate1 = new ChiTietLichSuUpdate();
        chiTietLichSuUpdate1.setId(1L);
        ChiTietLichSuUpdate chiTietLichSuUpdate2 = new ChiTietLichSuUpdate();
        chiTietLichSuUpdate2.setId(chiTietLichSuUpdate1.getId());
        assertThat(chiTietLichSuUpdate1).isEqualTo(chiTietLichSuUpdate2);
        chiTietLichSuUpdate2.setId(2L);
        assertThat(chiTietLichSuUpdate1).isNotEqualTo(chiTietLichSuUpdate2);
        chiTietLichSuUpdate1.setId(null);
        assertThat(chiTietLichSuUpdate1).isNotEqualTo(chiTietLichSuUpdate2);
    }
}
