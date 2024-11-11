package com.usagi.sorimaeul.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "script_tb")
public class Script {

    @Id
    @Column(name = "script_code")
    private int scriptCode;

    @Column(name = "script")
    private String script;

}
