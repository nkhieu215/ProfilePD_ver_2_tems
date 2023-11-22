package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class KichBanTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KichBan.class);
        KichBan kichBan1 = new KichBan();
        kichBan1.setId(1L);
        KichBan kichBan2 = new KichBan();
        kichBan2.setId(kichBan1.getId());
        assertThat(kichBan1).isEqualTo(kichBan2);
        kichBan2.setId(2L);
        assertThat(kichBan1).isNotEqualTo(kichBan2);
        kichBan1.setId(null);
        assertThat(kichBan1).isNotEqualTo(kichBan2);
    }
}
