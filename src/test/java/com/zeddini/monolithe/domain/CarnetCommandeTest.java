package com.zeddini.monolithe.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.zeddini.monolithe.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CarnetCommandeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CarnetCommande.class);
        CarnetCommande carnetCommande1 = new CarnetCommande();
        carnetCommande1.setId(1L);
        CarnetCommande carnetCommande2 = new CarnetCommande();
        carnetCommande2.setId(carnetCommande1.getId());
        assertThat(carnetCommande1).isEqualTo(carnetCommande2);
        carnetCommande2.setId(2L);
        assertThat(carnetCommande1).isNotEqualTo(carnetCommande2);
        carnetCommande1.setId(null);
        assertThat(carnetCommande1).isNotEqualTo(carnetCommande2);
    }
}
