package com.example.contacts;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ContactRepository contactRepository;

    @Override
    public void run(String... args) throws Exception {
        if (contactRepository.count() == 0) {
            Contact tony = Contact.builder()
                    .name("Anthony Edward Stark")
                    .phone("+1 (630) 555-0101")
                    .email("tony.stark@starkindustries.com")
                    .role("Chief Technology Officer")
                    .company("Marvel: Avengers")
                    .location("Malibu, California")
                    .status("Active")
                    .build();

            Contact bruce = Contact.builder()
                    .name("Bruce Wayne")
                    .phone("+1 (312) 555-0199")
                    .email("bruce.wayne@waynecorp.com")
                    .role("Chairman")
                    .company("DC: Justice League")
                    .location("Gotham City")
                    .status("Active")
                    .build();

            Contact natasha = Contact.builder()
                    .name("Natasha Romanoff")
                    .phone("+1 (212) 555-0456")
                    .email("black.widow@shield.gov")
                    .role("Intelligence Operative")
                    .company("Marvel: S.H.I.E.L.D.")
                    .location("Moscow / New York")
                    .status("Active")
                    .build();

            Contact diana = Contact.builder()
                    .name("Diana Prince")
                    .phone("+1 (202) 555-0789")
                    .email("diana.prince@themiscira.org")
                    .role("Ambassador")
                    .company("DC: Amazonia")
                    .location("Themyscira")
                    .status("Active")
                    .build();

            Contact wanda = Contact.builder()
                    .name("Wanda Maximoff")
                    .phone("+1 (518) 555-0123")
                    .email("scarlet.witch@avengers.com")
                    .role("Specialist")
                    .company("Marvel: Avengers")
                    .location("Westview, NJ")
                    .status("Active")
                    .build();

            Contact clark = Contact.builder()
                    .name("Clark Kent")
                    .phone("+1 (316) 555-0444")
                    .email("clark.kent@dailyplanet.com")
                    .role("Senior Journalist")
                    .company("DC: Daily Planet")
                    .location("Metropolis")
                    .status("Active")
                    .build();

            Contact selina = Contact.builder()
                    .name("Selina Kyle")
                    .phone("+1 (312) 555-0911")
                    .email("cat@kyle-antiques.com")
                    .role("Artifact Specialist")
                    .company("DC: Independent")
                    .location("Gotham City")
                    .status("Active")
                    .build();

            Contact scarlett = Contact.builder()
                    .name("Scarlett Johansson")
                    .phone("+1 (310) 555-0888")
                    .email("contact@scarlettj.com")
                    .role("Lead Actress")
                    .company("Hollywood: Talent")
                    .location("Los Angeles, CA")
                    .status("Active")
                    .build();

            Contact gal = Contact.builder()
                    .name("Gal Gadot")
                    .phone("+1 (310) 555-0777")
                    .email("office@galgadot.com")
                    .role("Producer / Actress")
                    .company("Hollywood: Talent")
                    .location("Tel Aviv / LA")
                    .status("Active")
                    .build();

            Contact zendaya = Contact.builder()
                    .name("Zendaya Coleman")
                    .phone("+1 (310) 555-0666")
                    .email("z@zendaya.com")
                    .role("Creative Director")
                    .company("Hollywood: Talent")
                    .location("Oakland, CA")
                    .status("Active")
                    .build();

            contactRepository.saveAll(Arrays.asList(
                tony, bruce, natasha, diana, wanda, 
                clark, selina, scarlett, gal, zendaya
            ));
            System.out.println("Seeded database with 10 diverse contacts.");
        }
    }
}
