package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ChiTietKichBanTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChiTietKichBan.class);
        ChiTietKichBan chiTietKichBan1 = new ChiTietKichBan();
        chiTietKichBan1.setId(1L);
        ChiTietKichBan chiTietKichBan2 = new ChiTietKichBan();
        chiTietKichBan2.setId(chiTietKichBan1.getId());
        assertThat(chiTietKichBan1).isEqualTo(chiTietKichBan2);
        chiTietKichBan2.setId(2L);
        assertThat(chiTietKichBan1).isNotEqualTo(chiTietKichBan2);
        chiTietKichBan1.setId(null);
        assertThat(chiTietKichBan1).isNotEqualTo(chiTietKichBan2);
    }
}
