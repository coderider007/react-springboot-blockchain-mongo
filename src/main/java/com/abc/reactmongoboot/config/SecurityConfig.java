package com.abc.reactmongoboot.config;

import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import com.abc.reactmongoboot.repositories.UserRepository;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    UserRepository userRepository;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Note: 
        // Use this to enable the tomcat basic authentication (tomcat popup rather than spring login page)
        // Note that the CSRf token is disabled for all requests
        http
        .authorizeRequests()
            .antMatchers("/**").authenticated() // These urls are allowed by any authenticated user
        .and()
            .httpBasic();
        http.csrf().disable();
    }

    @Bean
    public UserDetailsService userDetailsService() {

        Iterable<com.abc.reactmongoboot.models.User> users = userRepository.findAll();
        Iterator<com.abc.reactmongoboot.models.User> itr = users.iterator();
        // Set the inMemoryAuthentication object with the given credentials:
        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
        while(itr.hasNext()){
            com.abc.reactmongoboot.models.User usr = itr.next();
            String username = usr.getEmail();
            String password = usr.getPassword();
            if (username != null && password != null) {
                String encodedPassword = passwordEncoder().encode(password);
                manager.createUser(User.withUsername(username).password(encodedPassword).roles("USER").build());
            }
        }
        return manager;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}